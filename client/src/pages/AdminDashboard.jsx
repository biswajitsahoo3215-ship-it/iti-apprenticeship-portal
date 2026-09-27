import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
    const { token } = useAuth();

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [statsResponse, usersResponse, jobsResponse] =
                await Promise.all([
                    fetch(
                        "https://iti-apprenticeship-portal-6xp9.onrender.com/api/admin/stats",
                        { headers }
                    ),

                    fetch(
                        "https://iti-apprenticeship-portal-6xp9.onrender.com/api/admin/users",
                        { headers }
                    ),

                    fetch(
                        "https://iti-apprenticeship-portal-6xp9.onrender.com/api/admin/jobs",
                        { headers }
                    )
                ]);

            const statsData = await statsResponse.json();
            const usersData = await usersResponse.json();
            const jobsData = await jobsResponse.json();

            if (!statsResponse.ok) {
                throw new Error(
                    statsData.message ||
                    "Failed to load statistics."
                );
            }

            if (!usersResponse.ok) {
                throw new Error(
                    usersData.message ||
                    "Failed to load users."
                );
            }

            if (!jobsResponse.ok) {
                throw new Error(
                    jobsData.message ||
                    "Failed to load jobs."
                );
            }

            setStats(statsData);
            setUsers(usersData);
            setJobs(jobsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    const deleteUser = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await fetch(
                `https://iti-apprenticeship-portal-6xp9.onrender.com/api/admin/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete user."
                );
            }

            setMessage("User deleted successfully.");

            fetchDashboardData();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Loading admin dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage users, apprenticeships and
                        applications.
                    </p>
                </div>
            </div>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* Statistics */}
            {stats && (
                <section className="stats-grid">

                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p>{stats.totalUsers}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Students</h3>
                        <p>{stats.totalStudents}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Employers</h3>
                        <p>{stats.totalEmployers}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Total Jobs</h3>
                        <p>{stats.totalJobs}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Active Jobs</h3>
                        <p>{stats.activeJobs}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Applications</h3>
                        <p>{stats.totalApplications}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending Applications</h3>
                        <p>{stats.pendingApplications}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Selected</h3>
                        <p>{stats.selectedApplications}</p>
                    </div>

                </section>
            )}

            {/* Users */}
            <section className="dashboard-card">

                <h2>All Users</h2>

                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="table-container">

                        <table className="data-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Trade</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user) => (
                                    <tr key={user._id}>

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            <span
                                                className={`role-${user.role}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td>
                                            {user.trade || "-"}
                                        </td>

                                        <td>
                                            {user.location || "-"}
                                        </td>

                                        <td>
                                            <button
                                                className="danger-button"
                                                onClick={() =>
                                                    deleteUser(
                                                        user._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </section>

            {/* Jobs */}
            <section className="dashboard-card">

                <h2>All Apprenticeships</h2>

                {jobs.length === 0 ? (
                    <p>No apprenticeships found.</p>
                ) : (
                    <div className="table-container">

                        <table className="data-table">

                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Company</th>
                                    <th>Trade</th>
                                    <th>Location</th>
                                    <th>Stipend</th>
                                    <th>Status</th>
                                    <th>Posted By</th>
                                </tr>
                            </thead>

                            <tbody>

                                {jobs.map((job) => (
                                    <tr key={job._id}>

                                        <td>
                                            {job.title}
                                        </td>

                                        <td>
                                            {job.company}
                                        </td>

                                        <td>
                                            {job.trade}
                                        </td>

                                        <td>
                                            {job.location}
                                        </td>

                                        <td>
                                            ₹{job.stipend}
                                        </td>

                                        <td>
                                            <span
                                                className={`status-${job.status}`}
                                            >
                                                {job.status}
                                            </span>
                                        </td>

                                        <td>
                                            {job.postedBy?.name ||
                                                "Unknown"}
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </section>

        </div>
    );
};

export default AdminDashboard;