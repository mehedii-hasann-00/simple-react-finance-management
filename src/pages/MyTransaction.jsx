import { useContext, useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppsContext } from "../AppsContext";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Badge({ type }) {
  const isIncome = type === "income";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
      ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
      {isIncome ? "Income" : "Expense"}
    </span>
  );
}

export default function MyTransactions() {
  const { user } = useContext(AppsContext);
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [month, setMonth] = useState("all"); 

  const [sortBy, setSortBy] = useState('date');  
  const [order, setOrder] = useState('desc');
  const isInitialRender = useRef(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://react-finance-backend.vercel.app/get-data`, {
          method: "GET",
          headers: {
            auth_key: `Bearer ${user.accessToken}`,
            email: user.email,
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 201) {
          const data = await res.json();
          setRows(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        toast.error("Failed to fetch data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }


    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://react-finance-backend.vercel.app/sort?sortBy=${sortBy}&order=${order}`, {
          method: 'GET',
          headers: {
            auth_key: `Bearer ${user.accessToken}`,
            email: user.email,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setRows(data);
      } catch (err) {
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();

  }, [sortBy, order]);

  const handleSort = (field) => {
    setSortBy(field);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const monthsFromData = useMemo(() => {
    const set = new Set();
    rows.forEach((r) => {
      if (!r.date) return;
      const m = new Date(r.date).toISOString().slice(0, 7); 
      set.add(m);
    });
    return ["all", ...Array.from(set).sort().reverse()];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (month !== "all") {
        const m = new Date(r.date).toISOString().slice(0, 7);
        if (m !== month) return false;
      }
      if (q) {
        const target = `${r.category} ${r.description} ${r.amount}`.toLowerCase();
        if (!target.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [rows, q, type, month]);

  const totalIncome = filtered.filter(r => r.type === "income").reduce((a, b) => a + Number(b.amount || 0), 0);
  const totalExpense = filtered.filter(r => r.type === "expense").reduce((a, b) => a + Number(b.amount || 0), 0);
  const balance = totalIncome - totalExpense;
  

  const onDelete = async (id) => {
    const ok = await new Promise((resolve) => {
      const yes = () => { cleanup(); resolve(true); };
      const no = () => { cleanup(); resolve(false); };
      const cleanup = () => document.getElementById("confirm-root")?.remove();

      const root = document.createElement("div");
      root.id = "confirm-root";
      root.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/40";
      root.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 p-6 w-[90%] max-w-sm shadow-xl">
          <h3 class="text-lg font-semibold mb-2">Delete this transaction?</h3>
          <p class="text-slate-600 mb-4">This action cannot be undone.</p>
          <div class="flex justify-end gap-2">
            <button id="c-no" class="h-10 px-4 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
            <button id="c-yes" class="h-10 px-4 rounded-lg bg-rose-600 text-white hover:bg-rose-500">Delete</button>
          </div>
        </div>`;
      document.body.appendChild(root);
      root.querySelector("#c-no").addEventListener("click", no);
      root.querySelector("#c-yes").addEventListener("click", yes);
    });
    if (!ok) return;

    try {
      const res = await fetch(`https://react-finance-backend.vercel.app/transactions/${id}`, {
        method: "DELETE",
        headers: {
          auth_key: `Bearer ${user.accessToken}`,
          email: user.email,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setRows((s) => s.filter((r) => r._id !== id));
        toast.success("Transaction deleted");
      }
      else {
        toast.error("Delete failed");
      }


    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ToastContainer />
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Transactions</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/add-transaction")}
            className="h-11 px-5 rounded-lg text-white bg-emerald-600 hover:bg-emerald-500">
            + Add Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid md:grid-cols-4 sm:grid-cols-2 gap-3">
        <input
          placeholder="Search description / category / amount"
          value={q} onChange={(e) => setQ(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={() => { setQ(""); setType("all"); setMonth("all"); }}
          className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50 hover:text-black">
          Reset
        </button>
        <button
          onClick={() => handleSort('date')}
          className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50 hover:text-black"
        >
          Sort by Date {order === 'asc' ? '↑' : '↓'}
        </button>
        <button
          onClick={() => handleSort('amount')}
          className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50 hover:text-black"
        >
          Sort by Amount {order === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Balance</p>
          <p className={`mt-1 text-2xl font-bold ${balance >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Income</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Expenses</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">${totalExpense.toLocaleString()}</p>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <ClipLoader color="#3498db" loading={loading} size={100} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">No transactions found. Try changing filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t._id} className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between">
                <Badge type={t.type} />
                <span className="text-sm text-slate-500 text-black">{t.date}</span>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase text-slate-500">Category :
                  <span className="font-semibold text-black ml-2">{t.category}</span>
                </p>

              </div>
              <div className="mt-2">
                <p className="text-xs uppercase text-slate-500">Amount</p>
                <p className={`text-lg font-bold ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                  ${Number(t.amount || 0).toLocaleString()}
                </p>
              </div>
              {t.description ? (
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{t.description}</p>
              ) : null}

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => navigate(`/details/${t._id}`)}
                  className="h-10 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm text-black"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/transaction/update/${t._id}`)}
                  className="h-10 rounded-lg border border-indigo-300 text-indigo-700 hover:bg-indigo-50 text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(t._id)}
                  className="h-10 rounded-lg bg-rose-600 text-white hover:bg-rose-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
