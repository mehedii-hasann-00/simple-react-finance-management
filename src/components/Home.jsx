import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppsContext } from "../AppsContext";

export default function Home() {
    const { user } = useContext(AppsContext);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, totalBalance: 0 });

    useEffect(() => {
        // Replace this with your real data fetch
        setTimeout(() => {
            const totalIncome = 5600;
            const totalExpense = 3400;
            const totalBalance = totalIncome - totalExpense;
            setSummary({ totalIncome, totalExpense, totalBalance });
            setLoading(false);
        }, 800);
    }, [user]);

    return (
        <div className="bg-white dark:bg-[#0B1020] text-black dark:text-white transition-colors duration-300">
            {/* Banner */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >


                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Take Control of Your <span className="text-emerald-600">Finances</span> with{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-indigo-500">
                                FinEase
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                            Manage your income, expenses, and savings goals effortlessly. Track your money and
                            make smarter financial decisions.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/add-transaction"
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500 transition"
                            >
                                Add Transaction
                            </Link>
                            <Link
                                to="/my-transactions"
                                className="border border-gray-300 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
                            >
                                View Transactions
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/finance-banner.svg"
                            alt="Finance illustration"
                            className="max-w-md w-full rounded-2xl shadow-xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Overview Section */}
            <section id="overview" className="bg-gray-50 dark:bg-white/5 py-16 px-6 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-white">
                        Financial Overview
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse h-24 bg-gray-200 dark:bg-white/10 rounded-xl"
                                />
                            ))
                        ) : (
                            <>
                                <div className="rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400">
                                        Total Balance
                                    </h3>
                                    <p className="text-2xl font-bold mt-2">${summary.totalBalance.toLocaleString()}</p>
                                </div>
                                <div className="rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400">
                                        Total Income
                                    </h3>
                                    <p className="text-2xl font-bold mt-2 text-emerald-600">
                                        ${summary.totalIncome.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                                    <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400">
                                        Total Expenses
                                    </h3>
                                    <p className="text-2xl font-bold mt-2 text-red-600">
                                        ${summary.totalExpense.toLocaleString()}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Budgeting Tips + Financial Planning */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Budgeting Tips
                        </h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                            <li>Pay yourself first — set aside savings before spending.</li>
                            <li>Track every expense to identify areas of overspending.</li>
                            <li>Review your budget weekly and adjust when necessary.</li>
                            <li>Use FinEase to visualize income and expenses effortlessly.</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Why Financial Planning Matters
                        </h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                            <li>Gain confidence in your financial decisions.</li>
                            <li>Reduce money-related stress and anxiety.</li>
                            <li>Achieve long-term goals like travel, education, and investments.</li>
                            <li>Stay disciplined with your monthly budget using FinEase.</li>
                        </ul>
                    </motion.div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/add-transaction"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition"
                    >
                        Add New Transaction
                    </Link>
                    <Link
                        to="/reports"
                        className="border border-gray-300 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
                    >
                        Go to Reports
                    </Link>
                </div>

            </section>
        </div>
    );
}
