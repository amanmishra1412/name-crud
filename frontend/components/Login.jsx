import React from "react";

const Login = () => {
    return (
        <form className="flex flex-col gap-4 absolute w-full">
            <input
                type="email"
                placeholder="Email"
                className="input-box text-white p-1 outline-0"
            />
            <input
                type="password"
                placeholder="Password"
                className="input-box text-white p-1 outline-0"
            />
            <button className="btn-primary text-white">Login</button>
        </form>
    );
};

export default Login;
