import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {

    const [apps, setApps] = useState([]);

    const fetchApps = async () => {
        const res = await axios.get("http://localhost:5000/api/applications");
        setApps(res.data);
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const updateStatus = async (id, status) => {

        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:5000/api/applications/${id}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchApps();
    };

    return (
        <div>

            <h2>All Applications</h2>

            {apps.map(app => (
                <div key={app._id} className="job-card">

                    <p><b>Student:</b> {app.user.name}</p>
                    <p><b>Job:</b> {app.job.title}</p>

                    <p>
                        <b>Status:</b> {app.status}
                    </p>

                    <button onClick={() => updateStatus(app._id, "Selected")}>
                        Select
                    </button>

                    <button onClick={() => updateStatus(app._id, "Rejected")}>
                        Reject
                    </button>

                </div>
            ))}

        </div>
    );
};

export default AdminApplications;