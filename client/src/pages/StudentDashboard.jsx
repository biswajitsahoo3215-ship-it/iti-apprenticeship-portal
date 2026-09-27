import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
    const { user, token } = useAuth();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    "https://iti-apprenticeship-portal-6xp9.onrender.com/api/applications/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load applications."
                    );
                }

                setApplications(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchApplications();
        }
    }, [token]);

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>Student Dashboard</h1>

                    <p>
                        Welcome, {user?.name}
                    </p>
                </div>

                <Link
                    to="/jobs"
                    className="primary-button"
                >
                    Find Apprenticeships
                </Link>
            </div>

            {/* Profile */}
            <section className="dashboard-card">

                <h2>My Profile</h2>

                <div className="profile-grid">

                    <div>
                        <strong>Name</strong>
                        <p>{user?.name}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        <strong>Role</strong>
                        <p>Student</p>
                    </div>

                </div>

            </section>

            {/* Applications */}
            <section className="dashboard-card">

                <h2>My Applications</h2>

                {loading && (
                    <p>Loading applications...</p>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    applications.length === 0 && (
                        <div className="empty-state">

                            <p>
                                You haven't applied for any
                                apprenticeships yet.
                            </p>

                            <Link
                                to="/jobs"
                                className="primary-button"
                            >
                                Browse Apprenticeships
                            </Link>

                        </div>
                    )}

                <div className="applications-list">

                    {applications.map((application) => (
                        <div
                            className="application-card"
                            key={application._id}
                        >

                            <div>
                                <h3>
                                    {application.job?.title}
                                </h3>

                                <p>
                                    <strong>
                                        Company:
                                    </strong>{" "}
                                    {application.job?.company}
                                </p>

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {application.job?.location}
                                </p>

                                <p>
                                    <strong>
                                        Applied:
                                    </strong>{" "}
                                    {new Date(
                                        application.appliedAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="application-status">

                                <span
                                    className={`status-${application.status}`}
                                >
                                    {application.status}
                                </span>

                                {application.job?._id && (
                                    <Link
                                        to={`/jobs/${application.job._id}`}
                                        className="secondary-button"
                                    >
                                        View Job
                                    </Link>
                                )}

                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
};

export default StudentDashboard;