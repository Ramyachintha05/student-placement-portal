import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./../styles/myapplications.css";
const MyApplications = () => {

    const [applications, setApplications] = useState([]);
    const token = localStorage.getItem("token");

    // ✅ FIX: useCallback
    const fetchApplications = useCallback(async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/applications/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(res.data || []);

        } catch (err) {
            console.log(err.response?.data);
        }
    }, [token]);

    // useEffect now clean
    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>
                <h2>My Applications</h2>

                {applications.length === 0 ? (
                    <p>No applications found</p>
                ) : (
                    applications.map((app) => (
                        <div
                            key={app._id}
                            style={{
                                background: "white",
                                padding: "15px",
                                marginBottom: "10px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                        >
                            <h3>{app?.job?.title || "Job Deleted"}</h3>
                            <p>{app?.job?.company || "-"}</p>
                            <p>{app?.job?.location || "-"}</p>

                            <p>

                                Status:
                                <b style={{
                                    marginLeft: "8px",
                                    color:
                                        app?.status === "Selected"
                                            ? "green"
                                            : app?.status === "Rejected"
                                                ? "red"
                                                : "orange"
                                }}>
                                    {app?.status || "Pending"}
                                </b>
                            </p>
                        </div>
                    ))
                )}
            </div>
            {/* MOVE TO TOP BUTTON */}
            <button
                className="top-btn"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }
            >
                ↑ Top
            </button>
        </>
    );

};

export default MyApplications;