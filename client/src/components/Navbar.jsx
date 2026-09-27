import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    ITI Apprenticeship Portal
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Apprenticeships</Link>

                    {user && user.role === "student" && (
                        <Link to="/student-dashboard">
                            My Dashboard
                        </Link>
                    )}

                    {user && user.role === "employer" && (
                        <Link to="/employer-dashboard">
                            Employer Dashboard
                        </Link>
                    )}

                    {user && user.role === "admin" && (
                        <Link to="/admin-dashboard">
                            Admin Dashboard
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;