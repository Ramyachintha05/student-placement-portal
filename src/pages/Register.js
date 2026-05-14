import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/login.css";
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        branch: "",
        year: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = async () => {

        try {

            await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            toast.success("Registered successfully!");

            navigate("/login");

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.msg ||
                "Registration failed"
            );
        }
    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>Student Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="branch"
                    placeholder="Enter Branch"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="year"
                    placeholder="Enter Year"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="student">
                        Student
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <button onClick={registerUser}>
                    Register
                </button>

                <p>
                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;