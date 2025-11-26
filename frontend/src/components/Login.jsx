import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
const SERVER_URI = import.meta.env.VITE_SERVER_URI;

const Login = ({ loginData }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill all fields",
            });
            return;
        }
        try {
            const res = await axios.post(`${SERVER_URI}/auth/login`, {
                email,
                password,
            });
            const { data } = res;
            localStorage.setItem("token", data.token);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: data.msg,
            });
            loginData();
        } catch (err) {
            if (err.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response?.data?.msg,
                });
            } else {
                console.log(err);
            }
        }
    };

    return (
        <form
            className="flex flex-col gap-4 absolute w-full"
            onSubmit={(e) => {
                submitHandler(e);
            }}
        >
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="Email"
                className="input-box text-white p-1 outline-0"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="Password"
                className="input-box text-white p-1 outline-0"
            />
            <button className="btn-primary text-white">Login</button>
        </form>
    );
};

export default Login;
