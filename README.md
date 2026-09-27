# ITI Apprenticeship Portal

A full-stack web application that connects ITI students with apprenticeship opportunities posted by employers.

The platform provides separate dashboards and features for Students, Employers, and Administrators.

---

## 📌 Project Overview

The ITI Apprenticeship Portal is designed to simplify the process of discovering, posting, and managing apprenticeship opportunities.

### Students can:

- Create an account
- Login securely
- Browse apprenticeship opportunities
- View apprenticeship details
- Apply for apprenticeships
- Submit a cover letter
- Track application status

### Employers can:

- Create an employer account
- Login securely
- Post apprenticeship opportunities
- View applications received
- Shortlist candidates
- Reject candidates
- Select candidates

### Administrators can:

- View platform statistics
- View registered users
- View apprenticeship opportunities
- Manage users
- Monitor the platform

---

## 🚀 Features

- Student authentication
- Employer authentication
- Admin authentication
- JWT-based authorization
- Role-based access control
- Apprenticeship listing
- Apprenticeship details
- Online applications
- Application status management
- Employer dashboard
- Student dashboard
- Admin dashboard
- MongoDB database
- Responsive modern UI

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas

---

## 📂 Project Structure

```text
iti-apprenticeship-portal/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       ├── pages/
│       │   ├── AdminDashboard.jsx
│       │   ├── EmployerDashboard.jsx
│       │   ├── Home.jsx
│       │   ├── JobDetails.jsx
│       │   ├── Jobs.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── StudentDashboard.jsx
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   ├── Job.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md