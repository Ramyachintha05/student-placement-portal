import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./../styles/addjob.css";
import { toast } from "react-toastify";

const AddJob = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        description: "",
        skillsRequired: "",
        location: "",
        salary: "",
        deadline: ""
    });

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const addJob = async () => {

        const token = localStorage.getItem("token");

        setLoading(true);

        try {

            await axios.post(
                "http://localhost:5000/api/jobs",
                {
                    ...jobData,
                    skillsRequired: jobData.skillsRequired
                        .split(",")
                        .map(skill => skill.trim())
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Job added successfully!");
            // reset form
            setJobData({
                title: "",
                company: "",
                description: "",
                skillsRequired: "",
                location: "",
                salary: "",
                deadline: ""
            });

            // redirect to jobs page
            navigate("/");

        } catch (err) {

            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response?.data);

            toast(err.response?.data?.message || "Failed to add job");

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="addjob-container">

                <div className="addjob-box">

                    <h2>Add New Job</h2>

                    <input
                        name="title"
                        placeholder="Job Title"
                        value={jobData.title}
                        onChange={handleChange}
                    />

                    <input
                        name="company"
                        placeholder="Company"
                        value={jobData.company}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={jobData.description}
                        onChange={handleChange}
                    />

                    <input
                        name="skillsRequired"
                        placeholder="Skills (React, Node.js)"
                        value={jobData.skillsRequired}
                        onChange={handleChange}
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        value={jobData.location}
                        onChange={handleChange}
                    />

                    <input
                        name="salary"
                        placeholder="Salary"
                        value={jobData.salary}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="deadline"
                        value={jobData.deadline}
                        onChange={handleChange}
                    />

                    <button onClick={addJob} disabled={loading}>
                        {loading ? "Adding..." : "Add Job"}
                    </button>

                </div>

            </div>
        </>
    );
};

export default AddJob;