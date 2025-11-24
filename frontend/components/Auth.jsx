import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
    const [mode, setMode] = useState("login");

    return (
        <div className="flex items-center justify-center p-5 min-h-screen">
            <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl w-full max-w-md border border-white/20 shadow-lg overflow-hidden">
                <h1 className="text-center text-3xl font-semibold text-white mb-6">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>

                {/* Form */}
                <div className="relative h-[260px]">
                    {mode === "login" ? <Login /> : <Register />}
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
            </div>

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
