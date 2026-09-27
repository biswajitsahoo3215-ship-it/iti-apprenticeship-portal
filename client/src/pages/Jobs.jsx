import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    "https://iti-apprenticeship-portal-6xp9.onrender.com/api/jobs"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch apprenticeships."
                    );
                }

                setJobs(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="page-container">
                <h2>Loading apprenticeships...</h2>
            </div>
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <h1>Apprenticeship Opportunities</h1>

                <p>
                    Explore available apprenticeship opportunities
                    and find one that matches your skills.
                </p>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!error && jobs.length === 0 && (
                <div className="empty-state">
                    <h2>No Apprenticeships Available</h2>

                    <p>
                        There are currently no active apprenticeship
                        opportunities.
                    </p>
                </div>
            )}

            <div className="jobs-grid">

                {jobs.map((job) => (
                    <div className="job-card" key={job._id}>

                        <div className="job-card-header">
                            <h2>{job.title}</h2>

                            <span className="job-status">
                                {job.status}
                            </span>
                        </div>

                        <h3>{job.company}</h3>

                        <div className="job-info">
                            <p>
                                📍 <strong>Location:</strong>{" "}
                                {job.location}
                            </p>

                            <p>
                                🔧 <strong>Trade:</strong>{" "}
                                {job.trade}
                            </p>

                            <p>
                                💰 <strong>Stipend:</strong>{" "}
                                ₹{job.stipend}
                            </p>

                            <p>
                                ⏱️ <strong>Duration:</strong>{" "}
                                {job.duration}
                            </p>

                            <p>
                                👥 <strong>Vacancies:</strong>{" "}
                                {job.vacancies}
                            </p>
                        </div>

                        <p className="job-description">
                            {job.description.length > 150
                                ? `${job.description.substring(0, 150)}...`
                                : job.description}
                        </p>

                        <Link
                            to={`/jobs/${job._id}`}
                            className="primary-button"
                        >
                            View Details
                        </Link>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Jobs;