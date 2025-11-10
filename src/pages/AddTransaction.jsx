import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppsContext } from "../AppsContext";
import { toast } from "react-toastify";

const CATEGORIES = [
  "salary","freelance","investment",
  "home","utilities","transport","food","shopping","health","education","entertainment","other"
];

export default function AddTransaction() {
  const { user } = useContext(AppsContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "income",
    category: "salary",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
  });
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => {
    if (!user?.email) return true;
    if (!form.amount || Number(form.amount) <= 0) return true;
    if (!form.category || !form.type || !form.date) return true;
    return false;
  }, [form, user]);

  const handle = (key, val) => setForm((s) => ({ ...s, [key]: val }));

  const submit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    try {
      setLoading(true);
      const payload = {
        type: form.type,                      // "income" | "expense"
        category: form.category.toLowerCase(),
        amount: Number(form.amount),
        description: form.description?.trim(),
        date: new Date(form.date).toISOString(),
        email: user.email,
        name: user.displayName || "User",
      };

      const res = await fetch(`${API_BASE}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      toast.success("Transaction added!");
      navigate("/my-transactions");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Transaction</h1>
      </div>

      <form onSubmit={submit} className="space-y-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Type</label>
            <select
              value={form.type}
              onChange={(e) => handle("type", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">Category</label>
            <select
              value={form.category}
              onChange={(e) => handle("category", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => handle("amount", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-black">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => handle("description", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black"
            placeholder="Optional details"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">User Email</label>
            <input value={user?.email || ""} readOnly className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">User Name</label>
            <input value={user?.displayName || "User"} readOnly className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-black" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={disabled || loading}
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg text-white
                       bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500
                       disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 px-5 rounded-lg border border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
