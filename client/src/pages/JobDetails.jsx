import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
    const { id } = useParams();
    const { user, token } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(
                    `https://iti-apprenticeship-portal-6xp9.onrender.com/api/jobs/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load apprenticeship."
                    );
                }

                setJob(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setApplying(true);

        try {
            const response = await fetch(
                "https://iti-apprenticeship-portal-6xp9.onrender.com/api/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jobId: id,
                        coverLetter
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to submit application."
                );
            }

            setMessage("Application submitted successfully!");
            setCoverLetter("");
        } catch (error) {
            setError(error.message);
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Loading apprenticeship...</h2>
            </div>
        );
    }

    if (error && !job) {
        return (
            <div className="page-container">
                <div className="error-message">
                    {error}
                </div>

                <Link to="/jobs" className="primary-button">
                    Back to Apprenticeships
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container">

            <Link to="/jobs" className="back-link">
                ← Back to Apprenticeships
            </Link>

            <div className="job-details-card">

                <div className="job-details-header">
                    <div>
                        <h1>{job.title}</h1>
                        <h2>{job.company}</h2>
                    </div>

                    <span className="job-status">
                        {job.status}
                    </span>
                </div>

                <div className="job-details-grid">

                    <div>
                        <strong>Trade</strong>
                        <p>{job.trade}</p>
                    </div>

                    <div>
                        <strong>Location</strong>
                        <p>{job.location}</p>
                    </div>

                    <div>
                        <strong>Stipend</strong>
                        <p>₹{job.stipend}</p>
                    </div>

                    <div>
                        <strong>Duration</strong>
                        <p>{job.duration}</p>
                    </div>

                    <div>
                        <strong>Vacancies</strong>
                        <p>{job.vacancies}</p>
                    </div>

                </div>

                <div className="job-section">
                    <h2>About the Apprenticeship</h2>
                    <p>{job.description}</p>
                </div>

                {job.skills && job.skills.length > 0 && (
                    <div className="job-section">
                        <h2>Required Skills</h2>

                        <div className="skills-list">
                            {job.skills.map((skill, index) => (
                                <span
                                    className="skill-tag"
                                    key={index}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {job.postedBy && (
                    <div className="job-section">
                        <h2>Posted By</h2>

                        <p>
                            {job.postedBy.name}
                        </p>

                        <p>
                            {job.postedBy.email}
                        </p>
                    </div>
                )}

                {user && user.role === "student" && (
                    <div className="application-section">

                        <h2>Apply for this Apprenticeship</h2>

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

                        <form onSubmit={handleApply}>

                            <div className="form-group">
                                <label>
                                    Cover Letter
                                </label>

                                <textarea
                                    value={coverLetter}
                                    onChange={(e) =>
                                        setCoverLetter(e.target.value)
                                    }
                                    placeholder="Write a short cover letter..."
                                    rows="6"
                                />
                            </div>

                            <button
                                type="submit"
                                className="primary-button"
                                disabled={applying}
                            >
                                {applying
                                    ? "Submitting..."
                                    : "Apply Now"}
                            </button>

                        </form>
                    </div>
                )}

                {!user && (
                    <div className="login-prompt">
                        <p>
                            Please log in as a student to apply
                            for this apprenticeship.
                        </p>

                        <Link
                            to="/login"
                            className="primary-button"
                        >
                            Login to Apply
                        </Link>
                    </div>
                )}

            </div>

        </div>
    );
};

export default JobDetails;