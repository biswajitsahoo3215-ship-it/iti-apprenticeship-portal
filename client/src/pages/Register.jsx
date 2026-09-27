import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        phone: "",
        qualification: "",
        trade: "",
        location: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://iti-apprenticeship-portal-6xp9.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed.");
            }

            // Registration succeeds, then log the user in.
            const loginResponse = await fetch(
                "https://iti-apprenticeship-portal-6xp9.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(
                    loginData.message || "Registration succeeded, but login failed."
                );
            }

            login(loginData.user, loginData.token);

            if (loginData.user.role === "student") {
                navigate("/student-dashboard");
            } else if (loginData.user.role === "employer") {
                navigate("/employer-dashboard");
            } else {
                navigate("/admin-dashboard");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Join the ITI Apprenticeship Portal
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            minLength="6"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Type</label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="student">
                                Student
                            </option>

                            <option value="employer">
                                Employer
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Phone</label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Qualification</label>

                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            placeholder="e.g. ITI"
                        />
                    </div>

                    <div className="form-group">
                        <label>Trade</label>

                        <input
                            type="text"
                            name="trade"
                            value={formData.trade}
                            onChange={handleChange}
                            placeholder="e.g. Electrician"
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Bhubaneswar"
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-button auth-button"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="auth-footer">
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