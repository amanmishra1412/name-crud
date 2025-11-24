import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const SERVER_URI = import.meta.env.VITE_SERVER_URI;

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !email || !pass) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill all fields",
            });
            return;
        }

        try {
            const res = await axios.post(`${SERVER_URI}/auth/register`, {
                name,
                email,
                pass,
            });
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "User registered successfully",
                });

                setName("");
                setEmail("");
                setPass("");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.msg,
            });
        }

        // console.log("Submit");
    };

    return (
        <form
            className="flex flex-col gap-4 absolute w-full"
            onSubmit={(e) => {
                submitHandler(e);
            }}
        >
            <input
                type="text"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                value={name}
                placeholder="Full Name"
                className="input-box text-white outline-0"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder="Email Address"
                className="input-box text-white outline-0"
            />
            <input
                type="password"
                value={pass}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
                placeholder="Create Password"
                className="input-box text-white outline-0"
            />
            <button className="btn-primary text-white">Register</button>
        </form>
    );
};

export default Register;
