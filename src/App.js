import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Admin from "./pages/Admin";
import AddJob from "./pages/AddJob";

import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      {/* TOAST GLOBAL */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DEFAULT ROUTE */}
        <Route path="/" element={token ? <Jobs /> : <Navigate to="/login" />} />

        {/* USER */}
        <Route path="/my" element={token ? <MyApplications /> : <Navigate to="/login" />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoute role="admin">
              <AddJob />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;