import React, { useContext, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import { AppsContext } from "../AppsContext";
import { ClipLoader } from "react-spinners";

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppsContext);

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
          setData(data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryData = data.reduce((acc, curr) => {
    const category = curr.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += curr.amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map(key => ({
    name: key,
    value: categoryData[key]
  }));

  const monthlyData = data.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const month = `${date.getMonth() + 1}-${date.getFullYear()}`;

    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][curr.type] += curr.amount;

    return acc;
  }, {});

  const barChartData = Object.keys(monthlyData).map(month => ({
    name: month,
    income: monthlyData[month].income,
    expense: monthlyData[month].expense
  }));

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">Financial Summary</h1>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <ClipLoader color="#3498db" loading={loading} size={250} />
        </div>
      ) : (
        <div>
          {/* Pie Chart for Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Expense Distribution by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Monthly Totals */}
          <div>
            <h2 className="text-xl font-semibold">Income vs Expense by Month</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#0088FE" />
                <Bar dataKey="expense" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
