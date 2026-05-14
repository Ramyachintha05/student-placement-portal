import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./../styles/jobcard.css";
const JobCard = ({ job }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // APPLY JOB
    const applyJob = async () => {

        if (!token) {
            toast.error("Please login first");
            return;
        }

        setLoading(true);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/applications/apply",
                { jobId: job?._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(res.data?.message || "Applied successfully!");

        } catch (err) {

            console.log("APPLY ERROR:", err.response?.data);

            toast.error(
                err.response?.data?.message || "Apply failed"
            );

        } finally {
            setLoading(false);
        }
    };

    // DELETE JOB (ADMIN ONLY)
    const deleteJob = async () => {

        setDeleting(true);

        try {

            const res = await axios.delete(
                `http://localhost:5000/api/jobs/${job?._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(res.data?.message || "Job deleted");

            // refresh UI
            window.location.reload();

        } catch (err) {

            console.log("DELETE ERROR:", err.response?.data);

            toast.error(
                err.response?.data?.message || "Delete failed"
            );

        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="job-card">

            <h3>{job?.title}</h3>
            <p>{job?.company}</p>
            <p>{job?.description}</p>

            <p>📍 {job?.location}</p>
            <p>💰 {job?.salary}</p>

            {/* APPLY BUTTON */}
            <button
                className="apply-btn"
                onClick={applyJob}
                disabled={loading}
            >
                {loading ? "Applying..." : "Apply"}
            </button>

            {/* DELETE BUTTON (ADMIN ONLY) */}
            {user?.role === "admin" && (
                <button
                    className="delete-btn"
                    onClick={deleteJob}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            )}

        </div>
    );
};

export default JobCard;