import React, { useEffect, useState } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

const App = () => {
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState([]);
    const [editId, setEditId] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();

        if (editId) {
            // Update mode
            axios
                .put(`http://localhost:3000/api/update/${editId}`, { userName })
                .then((res) => {
                    if (res.status === 200) {
                        setUserData(
                            userData.map((item) =>
                                item._id === editId
                                    ? { ...item, userName }
                                    : item
                            )
                        );
                        setUserName("");
                        setEditId(null); // back to create mode
                    }
                })
                .catch((err) => console.log(err));
        } else {
            // Create mode
            axios
                .post("http://localhost:3000/api/create", { userName })
                .then((res) => {
                    if (res.status === 201) {
                        setUserData([...userData, res.data]);
                        setUserName("");
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const deleteBtn = (id) => {
        let userId = id;
        axios
            .delete(`http://localhost:3000/api/delete/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    setUserData(userData.filter((item) => item._id !== id));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/fetch")
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (editId) {
            axios
                .get(`http://localhost:3000/api/fetch/${editId}`)
                .then((res) => {
                    setUserName(res.data.userName);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [editId]);

    return (
        <>
            <div className="bg-black h-screen w-full flex flex-col justify-center items-center ">
                <div className="p-5 w-72 border-3 border-emerald-500 rounded-2xl">
                    <form
                        action=""
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <input
                            value={userName}
                            type="text"
                            className="border-2 border-white text-white p-3 mt-2 rounded-2xl w-full"
                            placeholder="Enter Username"
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        <button className="px-4 py-2 w-full rounded-2xl bg-emerald-600 text-white mt-3">
                            {editId ? "Update" : "Create"}
                        </button>
                    </form>
                </div>

                <p className="text-white text-2xl my-3">
                    Total Data : {userData.length}
                </p>
                <div className="mt-3 w-72 h-72 overflow-scroll flex flex-col gap-5">
                    {userData.map((val, idx) => {
                        return (
                            <div
                                key={idx}
                                className="flex justify-between px-5 py-3 border-4 text-white border-white"
                            >
                                <p>{val.userName}</p>
                                <div className="flex gap-4">
                                    <button
                                        data-id={val._id}
                                        className="text-yellow-500"
                                        onClick={() => {
                                            setEditId(val._id);
                                        }}
                                    >
                                        <i className="ri-pencil-line"></i>
                                    </button>
                                    <button
                                        className="text-red-500 delete-btn"
                                        onClick={() => {
                                            deleteBtn(val._id);
                                        }}
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
