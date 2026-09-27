import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-page">

            {/* HERO SECTION */}
            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Build Your Career
                        <br />
                        <span>With the Right Apprenticeship</span>
                    </h1>

                    <p>
                        Discover apprenticeship opportunities that match
                        your ITI trade, skills and career goals.
                        Connect with employers and take your next step.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/jobs"
                            className="primary-button"
                        >
                            Explore Apprenticeships →
                        </Link>

                        <Link
                            to="/register"
                            className="secondary-button"
                        >
                            Create Free Account
                        </Link>

                    </div>

                </div>

            </section>


            {/* FEATURES SECTION */}
            <section className="features-section">

                <h2>
                    Everything You Need to Start
                </h2>

                <p>
                    A simple platform connecting ITI students,
                    apprentices and employers.
                </p>

                <div className="features-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Discover Opportunities
                        </h3>

                        <p>
                            Find apprenticeship opportunities based
                            on your trade, location and skills.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📝
                        </div>

                        <h3>
                            Apply Online
                        </h3>

                        <p>
                            Apply to suitable apprenticeship
                            opportunities directly through the portal.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>
                            Connect With Employers
                        </h3>

                        <p>
                            Discover companies looking for skilled
                            ITI candidates and apprentices.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Track Applications
                        </h3>

                        <p>
                            Keep track of your applications and
                            monitor their current status.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            ⚡
                        </div>

                        <h3>
                            Faster Applications
                        </h3>

                        <p>
                            Keep your profile ready and apply to
                            opportunities without unnecessary steps.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🎯
                        </div>

                        <h3>
                            Career Focused
                        </h3>

                        <p>
                            Build practical experience and take the
                            next step toward your professional career.
                        </p>

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}
            <section className="how-it-works">

                <h2>
                    How It Works
                </h2>

                <p>
                    Start your apprenticeship journey in three
                    simple steps.
                </p>

                <div className="steps-grid">

                    <div className="step-card">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Create Your Profile
                        </h3>

                        <p>
                            Register and add your ITI trade,
                            qualification and skills.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Find an Opportunity
                        </h3>

                        <p>
                            Browse apprenticeship opportunities
                            posted by employers.
                        </p>

                    </div>


                    <div className="step-card">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Apply & Grow
                        </h3>

                        <p>
                            Submit your application and start
                            building real-world experience.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="cta-section">

                <h2>
                    Ready to Start Your Journey?
                </h2>

                <p>
                    Create your account and discover apprenticeship
                    opportunities that can help you build your career.
                </p>

                <Link
                    to="/register"
                    className="primary-button"
                >
                    Get Started →
                </Link>

            </section>

        </div>
    );
};

export default Home;