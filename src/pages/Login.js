import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./../styles/login.css";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // LOGIN FUNCTION
    const handleLogin = async () => {

        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );

            // SAVE TOKEN + USER
            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Login successful!");

            navigate("/");

        } catch (err) {

            console.log(err.response?.data);

            toast.error(
                err.response?.data?.message ||
                "Invalid credentials"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-box">

                <h2>Welcome Back 👋</h2>

                <p className="login-subtitle">
                    Login to your Placement Portal account
                </p>

                {/* EMAIL */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                />

                {/* LOGIN BUTTON */}
                <button
                    className="login-btn"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* REGISTER BUTTON */}
                <Link to="/register">
                    <button className="register-btn">
                        Create New Account
                    </button>
                </Link>

            </div>

        </div>
    );
};

export default Login;