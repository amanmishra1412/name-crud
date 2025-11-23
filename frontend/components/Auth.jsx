import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
    const [mode, setMode] = useState("login"); // login | register
    
    return (
        <div className="flex items-center justify-center p-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl w-full max-w-md border border-white/20 shadow-lg overflow-hidden"
            >
                <h1 className="text-center text-3xl font-semibold text-white mb-6">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>

                {/* Animation Wrapper */}
                <div className="relative h-[260px]">
                    <AnimatePresence mode="wait">
                        {mode === "login" ? (
                            <motion.form
                                key="login"
                                initial={{ x: 80, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -80, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col gap-4 absolute w-full"
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input-box text-white"
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input-box text-white"
                                />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary text-white"
                                >
                                    Login
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="register"
                                initial={{ x: -80, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 80, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col gap-4 absolute w-full"
                            >
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input-box text-white"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="input-box text-white"
                                />

                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    className="input-box text-white"
                                />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary text-white"
                                >
                                    Register
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Toggle Text */}
                <p className="text-center text-white mt-6">
                    {mode === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        onClick={() =>
                            setMode(mode === "login" ? "register" : "login")
                        }
                        className="text-emerald-300 ml-2 hover:text-emerald-400 transition"
                    >
                        {mode === "login" ? "Register" : "Login"}
                    </button>
                </p>
            </motion.div>

            {/* Tailwind Custom Classes */}
            <style>{`
                .input-box {
                    @apply w-full p-3 rounded-xl bg-white/20 border border-white/30 
                    text-white placeholder-gray-300 focus:outline-none 
                    focus:ring-2 focus:ring-emerald-400 transition-all duration-300;
                }
                .btn-primary {
                    @apply w-full py-3 rounded-xl bg-emerald-500 text-white 
                    font-semibold tracking-wide hover:bg-emerald-600 
                    transition-all duration-300;
                }
            `}</style>
        </div>
    );
};

export default Auth;
