import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppsContext } from "../AppsContext";
import { motion } from "framer-motion";

export default function Home() {




    return (
        <>
            <section className="relative bg-[#f8f7f3] overflow-hidden py-8">
                <div className="grid md:grid-cols-2 items-center min-h-[80vh] px-8 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl md:text-6xl font-serif leading-tight text-[#1f3a2e]">
                            Uncomplicate <br />
                            indoor <br />
                            <span className="italic text-green-800">gardening</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-md">
                            Explore our collection of healthy indoor plants and accessories to
                            create your own green oasis.
                        </p>
                        <Link
                            to="/plants"
                            className="inline-block border border-gray-400 text-gray-800 px-6 py-3 rounded-md hover:bg-green-800 hover:text-white transition"
                        >
                            Discover
                        </Link>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="flex justify-center mt-10 md:mt-0"
                    >
                        <img
                            src="/slider1.jpg"
                            alt="Indoor plants"
                            className="rounded-lg shadow-lg w-full max-w-md md:max-w-lg object-cover"
                        />
                    </motion.div>
                </div>
            </section>


            <section className="py-16 px-8 bg-white">
                <h2 className="text-3xl font-semibold text-center text-green-800 mb-10">
                     Meet Our Green Experts
                </h2>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto text-center">
                    {[
                        {
                            name: "Sophia Green",
                            role: "Plant Care Specialist",
                            img: "/sophie.jpeg",
                        },
                        {
                            name: "Liam Leaf",
                            role: "Indoor Decor Expert",
                            img: "/liam.jpeg",
                        },
                        {
                            name: "Ava Bloom",
                            role: "Botanical Designer",
                            img: "/ava.jpeg",
                        },
                        {
                            name: "Ethan Moss",
                            role: "Soil & Growth Expert",
                            img: "/moss.jpeg",
                        },
                    ].map((expert) => (
                        <div
                            key={expert.name}
                            className="bg-gray-50 rounded-xl p-6 border hover:shadow-md transition"
                        >
                            <img
                                src={expert.img}
                                alt={expert.name}
                                className="w-32 h-32 rounded-lg mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold text-slate-800">
                                {expert.name}
                            </h3>
                            <p className="text-green-700 text-sm">{expert.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-8 bg-[#f8f7f3]">
                <h2 className="text-3xl font-semibold text-center text-green-800 mb-10">
                     Eco Decor Ideas
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Minimalist Green Corner",
                            img: "/minimal.jpeg",
                        },
                        {
                            title: "Bedroom Jungle Vibes",
                            img: "/jungle.jpeg",
                        },
                        {
                            title: "Office Fresh Space",
                            img: "/office.jpeg",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl overflow-hidden shadow-sm bg-white border hover:shadow-md transition"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-32 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
