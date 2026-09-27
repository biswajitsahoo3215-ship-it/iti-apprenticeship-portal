import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import StudentDashboard from "./pages/StudentDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />


                {/* STUDENT ROUTES */}

                <Route element={<ProtectedRoute allowedRoles={["student"]} />}>

                    <Route
                        path="/student-dashboard"
                        element={<StudentDashboard />}
                    />

                </Route>


                {/* EMPLOYER ROUTES */}

                <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>

                    <Route
                        path="/employer-dashboard"
                        element={<EmployerDashboard />}
                    />

                </Route>


                {/* ADMIN ROUTES */}

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>

                    <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;