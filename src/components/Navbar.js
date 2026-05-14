import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./../styles/navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        navigate("/login");
    };

    return (
        <div className="navbar">

            <h2 className="logo">
                Placement Portal
            </h2>

            <div className="nav-links">

                {/* PUBLIC LINKS */}
                <Link to="/">Jobs</Link>

                {token && (
                    <Link to="/my">
                        My Applications
                    </Link>
                )}

                {user?.role?.toLowerCase() === "admin" && (
                    <>
                        <Link to="/admin">Admin</Link>
                        <Link to="/add-job">Add Job</Link>
                    </>


                )}

                {/* LOGOUT ONLY IF LOGGED IN */}
                {token ? (
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

            </div>

        </div>
    );
};

export default Navbar;