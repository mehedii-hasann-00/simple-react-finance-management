import { useContext, useEffect, useMemo, useState } from "react";
import { AppsContext } from "../AppsContext";
import { toast } from "react-toastify";

const API_BASE = "/api";

export default function Reports() {
  const { user } = useContext(AppsContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("all"); // yyyy-mm or "all"

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/transactions?email=${encodeURIComponent(user.email)}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        toast.error(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) run();
  }, [user?.email]);

  const monthsFromData = useMemo(() => {
    const set = new Set();
    rows.forEach((r) => {
      if (!r.date) return;
      set.add(new Date(r.date).toISOString().slice(0, 7));
    });
    return ["all", ...Array.from(set).sort().reverse()];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (month === "all") return true;
      const m = new Date(r.date).toISOString().slice(0, 7);
      return m === month;
    });
  }, [rows, month]);

  const totalIncome = filtered.filter(r => r.type === "income").reduce((a,b)=>a+Number(b.amount||0),0);
  const totalExpense = filtered.filter(r => r.type === "expense").reduce((a,b)=>a+Number(b.amount||0),0);
  const balance = totalIncome - totalExpense;

  const byCategory = useMemo(() => {
    const map = {};
    filtered.forEach((r) => {
      const k = r.category || "uncategorized";
      map[k] ??= { income: 0, expense: 0 };
      map[k][r.type === "income" ? "income" : "expense"] += Number(r.amount || 0);
    });
    return Object.entries(map)
      .map(([k, v]) => ({ category: k, income: v.income, expense: v.expense, net: v.income - v.expense }))
      .sort((a,b)=>Math.abs(b.net)-Math.abs(a.net));
  }, [filtered]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-slate-600 mt-1">Insightful summaries without charts.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={month} onChange={(e)=>setMonth(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2">
            {monthsFromData.map((m)=>(
              <option key={m} value={m}>{m === "all" ? "All months" : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Total Balance</p>
          <p className={`mt-1 text-3xl font-bold ${balance>=0?"text-emerald-600":"text-rose-600"}`}>
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Total Income</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Total Expenses</p>
          <p className="mt-1 text-3xl font-bold text-rose-600">${totalExpense.toLocaleString()}</p>
        </div>
      </div>

      {/* Category Table */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold">By Category</h3>
          <p className="text-slate-600 text-sm">
            Highest absolute net shown first (income − expense).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Category</th>
                <th className="text-right px-5 py-3 font-semibold">Income</th>
                <th className="text-right px-5 py-3 font-semibold">Expense</th>
                <th className="text-right px-5 py-3 font-semibold">Net</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-5 py-6 text-center text-slate-500">Loading…</td></tr>
              ) : byCategory.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-6 text-center text-slate-500">No data</td></tr>
              ) : (
                byCategory.map((r)=>(
                  <tr key={r.category} className="border-t border-slate-100">
                    <td className="px-5 py-3 font-medium">{r.category[0].toUpperCase()+r.category.slice(1)}</td>
                    <td className="px-5 py-3 text-right text-emerald-700">${r.income.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-rose-700">${r.expense.toLocaleString()}</td>
                    <td className={`px-5 py-3 text-right font-semibold ${r.net>=0?"text-emerald-700":"text-rose-700"}`}>
                      ${r.net.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Narrative summary */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-2">Summary</h4>
        {loading ? (
          <p className="text-slate-600">Preparing insights…</p>
        ) : (
          <p className="text-slate-700 leading-relaxed">
            {month === "all" ? "Overall, " : `${month} snapshot: `}
            you earned <span className="font-semibold text-emerald-700">${totalIncome.toLocaleString()}</span> and spent{" "}
            <span className="font-semibold text-rose-700">${totalExpense.toLocaleString()}</span>, resulting in a{" "}
            <span className={`font-semibold ${balance>=0?"text-emerald-700":"text-rose-700"}`}>
              {balance>=0 ? "surplus" : "deficit"} of ${Math.abs(balance).toLocaleString()}
            </span>. Categories with the biggest impact are{" "}
            {byCategory.slice(0,3).map(c => c.category).map((c,i,arr)=>(
              <span key={c} className="font-medium">{c}{i<arr.length-1?", ": ""}</span>
            ))}{byCategory.length?".": "not yet available."}
          </p>
        )}
      </div>
    </div>
  );
}
