import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./../styles/admin.css";

const Admin = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/api/applications"
            );

            setApplications(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    const changeStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:5000/api/applications/${id}/status`,
                { status }
            );

            fetchAll();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="admin-container">

                <h2 className="admin-title">
                    Admin Dashboard
                </h2>

                {applications.map((app) => (

                    <div className="admin-card" key={app._id}>

                        <h3>{app.job?.title}</h3>

                        <p>
                            <strong>Student:</strong>
                            {" "}
                            {app.user?.name}
                        </p>

                        <p>
                            <strong>Company:</strong>
                            {" "}
                            {app.job?.company}
                        </p>

                        <span className={`status ${app.status.toLowerCase()}`}>
                            {app.status}
                        </span>

                        <div className="btn-group">

                            <button
                                className="select-btn"
                                onClick={() =>
                                    changeStatus(app._id, "Selected")
                                }
                            >
                                Select
                            </button>

                            <button
                                className="reject-btn"
                                onClick={() =>
                                    changeStatus(app._id, "Rejected")
                                }
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </>
    );
};

export default Admin;