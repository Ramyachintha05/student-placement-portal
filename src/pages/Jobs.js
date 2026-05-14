import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

import "./../styles/jobs.css";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    // FETCH JOBS
    const fetchJobs = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/jobs"
            );

            setJobs(res.data || []);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // SEARCH FILTER
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="jobs-page">

                {/* HERO */}
                <div className="jobs-hero">

                    <h1>
                        Find Your Dream Job 🚀
                    </h1>

                    <p>
                        Explore internships and placements
                        from top companies
                    </p>

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Search jobs, company, location..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* JOB LIST */}
                <div className="jobs-grid">

                    {filteredJobs.length === 0 ? (
                        <p>No jobs found</p>
                    ) : (
                        filteredJobs.map((job) => (
                            <JobCard
                                key={job._id}
                                job={job}
                            />
                        ))
                    )}

                </div>

            </div>
        </>
    );
};

export default Jobs;