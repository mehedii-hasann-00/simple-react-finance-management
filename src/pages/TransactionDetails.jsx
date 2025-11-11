import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppsContext } from '../AppsContext';
import { ToastContainer, toast } from 'react-toastify';

export default function TransactionDetails() {
  const { user } = useContext(AppsContext);
  const { id } = useParams();  // Get transaction ID from the URL
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`https://react-finance-backend.vercel.app/transactions/${id}`, {
          method: 'GET',
          headers: {
            auth_key: `Bearer ${user.accessToken}`,
            email: user.email,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTransaction(data);
        } else {
          toast.error("Transaction not found");
        }
      } catch (err) {
        toast.error("Failed to fetch transaction data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransaction();
    }
  }, [id, user]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const res = await fetch(`https://react-finance-backend.vercel.app/transactions/${id}`, {
          method: 'DELETE',
          headers: {
            auth_key: `Bearer ${user.accessToken}`,
            email: user.email,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          toast.success("Transaction deleted!");
          navigate('/my-transactions');  // Redirect after deletion
        } else {
          toast.error("Failed to delete transaction");
        }
      } catch (err) {
        toast.error("Error deleting transaction");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transaction) {
    return <div>No transaction found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <ToastContainer />
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transaction Details</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <p className='text-black'><strong>Type:</strong> {transaction.type}</p>
          <p className='text-black'><strong>Category:</strong> {transaction.category}</p>
          <p className='text-black'><strong>Amount:</strong> ${transaction.amount}</p>
          <p className='text-black'><strong>Description:</strong> {transaction.description || "No description"}</p>
          <p className='text-black'><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/update/${transaction._id}`)}  // Navigate to the update page
            className="h-10 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="h-10 px-4 rounded-lg bg-rose-600 text-white hover:bg-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
