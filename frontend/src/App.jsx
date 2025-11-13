import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
const SERVER_URI = import.meta.env.VITE_SERVER_URI;

const App = () => {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await axios.put(
                    `${SERVER_URI}/api/update/${editId}`,
                    { userName }
                );
                if (res.status === 200) {
                    setUserData(
                        userData.map((item) =>
                            item._id === editId ? { ...item, userName } : item
                        )
                    );
                    setUserName("");
                    setEditId(null);
                }
            } else {
                const res = await axios.post(`${SERVER_URI}/api/create`, {
                    userName,
                });
                if (res.status === 201) {
                    setUserData([...userData, res.data]);
                    setUserName("");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBtn = async (id) => {
        try {
            const res = await axios.delete(`${SERVER_URI}/api/delete/${id}`);
            if (res.status === 200) {
                setUserData(userData.filter((item) => item._id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${SERVER_URI}/api/fetch`)
            .then((response) => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (editId) {
            axios
                .get(`${SERVER_URI}/api/fetch/${editId}`)
                .then((res) => {
                    setUserName(res.data.userName);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [editId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-5">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl w-full max-w-md border border-white/20 shadow-lg"
            >
                <h1 className="text-center text-3xl font-semibold text-white mb-4">
                    {editId ? "Update User" : "Create User"}
                </h1>

                <form onSubmit={submitHandler} className="flex flex-col gap-3">
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        placeholder="Enter Username"
                        className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold tracking-wide hover:bg-emerald-600 transition-all duration-300"
                    >
                        {editId ? "Update" : "Create"}
                    </motion.button>
                </form>
            </motion.div>

            <p className="text-white text-lg mt-5">
                Total Users: {userData.length}
            </p>

            <div className="mt-6 w-full max-w-md h-80 overflow-y-auto rounded-xl bg-white/10 border border-white/20 p-4 flex flex-col gap-3 shadow-inner">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                            }}
                            className="w-10 h-10 border-4 border-white border-t-emerald-400 rounded-full"
                        ></motion.div>
                    </div>
                ) : (
                    <AnimatePresence>
                        {userData.map((val) => (
                            <motion.div
                                key={val._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex justify-between items-center p-3 rounded-lg bg-white/20 text-white border border-white/30"
                            >
                                <p className="text-lg font-medium">
                                    {val.userName}
                                </p>
                                <div className="flex gap-4 text-xl">
                                    <button
                                        onClick={() => setEditId(val._id)}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        <i className="ri-pencil-line"></i>
                                    </button>
                                    <button
                                        onClick={() => deleteBtn(val._id)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default App;
