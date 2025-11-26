import React, { useState } from "react";
import Auth from "./components/Auth";
import CrudCard from "./components/CrudCard";
import { useEffect } from "react";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // If not logged in → Only show login page
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] p-5">
                <Auth
                    onLoginSuccess={() => {
                        setIsLoggedIn(true);
                    }}
                />
            </div>
        );
    }

    // CRUD Functionalities

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-[#1e1e1e] p-5">
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }}
                className="absolute top-5 right-5 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
                Logout
            </button>

            <CrudCard />
        </div>
    );
};

export default App;
