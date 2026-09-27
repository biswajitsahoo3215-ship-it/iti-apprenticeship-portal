import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
    const { user, token } = useAuth();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        description: "",
        trade: "",
        location: "",
        stipend: "",
        duration: "",
        vacancies: "",
        skills: ""
    });

    const handleJobChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "https://iti-apprenticeship-portal-6xp9.onrender.com/api/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...jobData,
                        stipend: Number(jobData.stipend),
                        vacancies: Number(jobData.vacancies),
                        skills: jobData.skills
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create apprenticeship."
                );
            }

            setMessage("Apprenticeship posted successfully.");

            setJobData({
                title: "",
                company: "",
                description: "",
                trade: "",
                location: "",
                stipend: "",
                duration: "",
                vacancies: "",
                skills: ""
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await fetch(
                "https://iti-apprenticeship-portal-6xp9.onrender.com/api/applications/employer",
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

    useEffect(() => {
        if (token) {
            fetchApplications();
        }
    }, [token]);

    const updateApplicationStatus = async (
        applicationId,
        status
    ) => {
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                `https://iti-apprenticeship-portal-6xp9.onrender.com/api/applications/${applicationId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update application status."
                );
            }

            setMessage(
                "Application status updated successfully."
            );

            fetchApplications();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>Employer Dashboard</h1>

                    <p>
                        Welcome, {user?.name}
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

            {/* Create Job */}
            <section className="dashboard-card">

                <h2>Post an Apprenticeship</h2>

                <form onSubmit={handleCreateJob}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Job Title</label>

                            <input
                                type="text"
                                name="title"
                                value={jobData.title}
                                onChange={handleJobChange}
                                placeholder="e.g. Electrician Apprentice"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Company</label>

                            <input
                                type="text"
                                name="company"
                                value={jobData.company}
                                onChange={handleJobChange}
                                placeholder="Company name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Trade</label>

                            <input
                                type="text"
                                name="trade"
                                value={jobData.trade}
                                onChange={handleJobChange}
                                placeholder="e.g. Electrician"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={jobData.location}
                                onChange={handleJobChange}
                                placeholder="e.g. Bhubaneswar"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Stipend</label>

                            <input
                                type="number"
                                name="stipend"
                                value={jobData.stipend}
                                onChange={handleJobChange}
                                placeholder="e.g. 10000"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Duration</label>

                            <input
                                type="text"
                                name="duration"
                                value={jobData.duration}
                                onChange={handleJobChange}
                                placeholder="e.g. 12 months"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Vacancies</label>

                            <input
                                type="number"
                                name="vacancies"
                                value={jobData.vacancies}
                                onChange={handleJobChange}
                                placeholder="e.g. 5"
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Skills</label>

                            <input
                                type="text"
                                name="skills"
                                value={jobData.skills}
                                onChange={handleJobChange}
                                placeholder="Electrical, Wiring, Maintenance"
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={jobData.description}
                            onChange={handleJobChange}
                            placeholder="Describe the apprenticeship..."
                            rows="6"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Post Apprenticeship
                    </button>

                </form>

            </section>

            {/* Applications */}
            <section className="dashboard-card">

                <h2>Applications Received</h2>

                {loading && (
                    <p>Loading applications...</p>
                )}

                {!loading &&
                    applications.length === 0 && (
                        <div className="empty-state">
                            <p>
                                No applications received yet.
                            </p>
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
                                    {application.student?.name}
                                </h3>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {application.student?.email}
                                </p>

                                <p>
                                    <strong>Apprenticeship:</strong>{" "}
                                    {application.job?.title}
                                </p>

                                <p>
                                    <strong>Company:</strong>{" "}
                                    {application.job?.company}
                                </p>

                                {application.coverLetter && (
                                    <p>
                                        <strong>
                                            Cover Letter:
                                        </strong>{" "}
                                        {application.coverLetter}
                                    </p>
                                )}
                            </div>

                            <div className="application-actions">

                                <span
                                    className={`status-${application.status}`}
                                >
                                    {application.status}
                                </span>

                                <select
                                    value={application.status}
                                    onChange={(e) =>
                                        updateApplicationStatus(
                                            application._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="shortlisted">
                                        Shortlisted
                                    </option>

                                    <option value="selected">
                                        Selected
                                    </option>

                                    <option value="rejected">
                                        Rejected
                                    </option>
                                </select>

                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
};

export default EmployerDashboard;