import React, { useState } from "react";
import Login from "./components/Auth";
import CrudCard from "./components/CrudCard";

const App = () => {
    // PLACE LOGIN HERE — Optional Login State
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // If not logged in → Only show login page
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-5">
                <Login onLoginSuccess={() => setIsLoggedIn(true)} />
            </div>
        );
    }

    // CRUD Functionalities

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-5">
            <button
                onClick={() => setIsLoggedIn(false)}
                className="absolute top-5 right-5 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
                Logout
            </button>

            <CrudCard />
        </div>
    );
};

export default App;
