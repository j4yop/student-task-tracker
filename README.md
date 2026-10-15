# Student Task & Assignment Tracker

A professional, production-ready, fully responsive web application engineered to manage multi-course student workloads. The architecture combines a vanilla HTML5/CSS3/ES6 JS Single-Page Application (SPA) on the frontend with a Model-View-Controller (MVC) Node.js/Express framework on the backend, backed by MongoDB.

---

## 1. Project Directory Structure

```
c:\Users\amarc\Desktop\SE_PROJECT\
├── client/                     # Frontend SPA application
│   ├── index.html              # Core SPA HTML shell
│   ├── styles.css              # Custom responsive Slate styling sheet
│   └── app.js                  # Frontend controller & Publisher State manager
├── config/                     # Backend configuration
│   └── db.js                   # Mongoose database pool connection
├── controllers/                # REST Controllers (Auth, Tasks, Categories, Analytics, Admin)
│   ├── adminController.js
│   ├── analyticsController.js
│   ├── authController.js
│   ├── categoryController.js
│   └── taskController.js
├── database/                   # Seed files and databases scripts
│   └── seed.js                 # Automatic seed dataset loader
├── docs/                       # Project manuals & diagrams
│   ├── postman_collection.json # Exported Postman JSON Collection file
│   ├── project_report.pdf      # Programmatically compiled PDF Report
│   └── project_report.docx     # Programmatically compiled DOCX Report
├── helpers/                    # Automation scripting helpers
│   └── generate_reports.js     # Programmatic PDF/DOCX exporter engine
├── middleware/                 # Authentication, rate-limits, sanitization, errors
│   ├── auditLogger.js          # Operations tracker middleware
│   ├── authMiddleware.js       # JWT & role checker
│   ├── errorMiddleware.js      # Global Express error handler
│   └── securityMiddleware.js   # Helmet, CORS, and XSS sanitizers
├── models/                     # Mongoose Schema Definitions
│   ├── AuditLog.js
│   ├── Category.js
│   ├── Notification.js
│   ├── Reminder.js
│   ├── Task.js
│   └── User.js
├── routes/                     # Router path definitions
│   ├── adminRoutes.js
│   ├── analyticsRoutes.js
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── notificationRoutes.js
│   └── taskRoutes.js
├── services/                   # Background services
│   └── reminderScheduler.js    # Task alert background loop scans
├── tests/                      # Testing script suites
│   ├── auth.test.js
│   ├── security.test.js
│   └── tasks.test.js
├── utils/                      # Helper libraries
│   ├── errorResponse.js
│   ├── logger.js               # Structured logger
│   └── tokenUtils.js           # JWT signature wrappers
├── Dockerfile                  # Container configurations
├── docker-compose.yml          # Multicontainer coordinator
├── package.json                # Dependencies and npm script targets
└── .env                        # Local environment variables
```

---

## 2. API Endpoints Reference

### 2.1 Authentication (`/api/auth`)
* `POST /register` : Register a new Student profile.
* `POST /login` : Authenticate user & receive Access Token + HttpOnly Refresh Token cookie.
* `POST /logout` : Revoke active refresh token and wipe browser cookies.
* `POST /refresh-token` : Rotate refresh tokens to acquire new access JWTs.
* `GET /profile` : Retrieve active authenticated user profile details.
* `PUT /profile/password` : Reset current password (requires current verification).
* `POST /forgot-password` : Mock email recovery dispatch (generates temporary reset code).
* `POST /reset-password` : Apply new credentials linking email and reset code.

### 2.2 Category Module (`/api/categories`)
* `GET /` : Retrieve global default categories + user custom categories.
* `POST /` : Create user category (with validation checking name duplications).
* `PUT /:id` : Update user category.
* `DELETE /:id` : Delete user category (triggers cascade delete of tasks under it).

### 2.3 Task Module (`/api/tasks`)
* `GET /` : Get tasks (supports keyword `search`, `category`, `priority`, `status`, pagination `page`, and custom `sortBy` queries).
* `POST /` : Create task (automatically schedules a background alert if `remindMe` is active).
* `GET /:id` : View single task detail.
* `PUT /:id` : Edit task fields (reschedules reminder alerts if date or preferences shift).
* `DELETE /:id` : Remove task & associated scheduling alerts.
* `PATCH //:id/complete` : Toggle completed/pending status.
* `POST /bulk/complete` : Complete multiple tasks.
* `POST /bulk/delete` : Delete multiple tasks.
* `POST /bulk/category` : Re-assign category for multiple tasks.

### 2.4 Analytics & Reporting (`/api/analytics`)
* `GET /dashboard-stats` : Fetch metrics totals (completions, pendings, overdue counts, upcoming timelines).
* `GET /reports/weekly` : Aggregations grouping task counts by weekdays.
* `GET /reports/monthly` : Aggregations grouping task count distribution by Category.

### 2.5 Notifications (`/api/notifications`)
* `GET /` : Fetch notification history.
* `PUT /:id/read` : Mark specific notification read.
* `PUT /read-all` : Mark all unread notifications read.
* `DELETE /clear-all` : Clear notification history database.

### 2.6 User Governance (`/api/admin`) *(Restricted to Admin Role)*
* `GET /users` : View all user registrations.
* `PATCH /users/:id/role` : Toggle role switch between student and admin.
* `GET /audit-logs` : Inspect global application audit trails.
* `GET /system-stats` : Fetch database counts (total users, logs, tasks).

---

## 3. Installation & Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v20+ Recommended)
* [MongoDB](https://www.mongodb.com/) (Local service or MongoDB Atlas cluster connection)
* Or [Docker Desktop](https://www.docker.com/)

### 3.1 Local Environment Deployment
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure environment Variables**:
   Copy `.env.example` to `.env` and fill the variables:
   ```bash
   cp .env.example .env
   ```
3. **Seed Database**:
   Populates global categories, mock users (`student@tracker.com` password: `studentpassword` / `admin@tracker.com` password: `adminpassword`), tasks, audit logs, and notification records:
   ```bash
   npm run seed
   ```
4. **Start Application**:
   Starts the Express server on port 5000:
   ```bash
   npm start
   ```
   Open `http://localhost:5000` in your web browser.

### 3.2 Running via Docker
Build and launch the complete application stack (Node service + MongoDB service) in Docker containers:
```bash
docker-compose up --build
```
The application will automatically wait for the MongoDB database to pass its health checks, seed itself if needed, and run on `http://localhost:5000`.

---

## 4. Verification & Testing

Verify system security, schema validation, and routes using the automated test suite:
```bash
npm test
```
The test runner configures a clean environment utilizing `student_tracker_test` database to run unit tests and supertest endpoint verification blocks, outputting status reports and cleaning up after termination.

---

## 5. Report Compilations

Compile the Software Engineering Project Report in PDF and Word DOCX formats directly via command:
```bash
npm run report
```
This runs the builder script programmatically outputting formatted documents:
* `docs/project_report.pdf`
* `docs/project_report.docx`
Alternatively, you can trigger compilation from the admin dashboard inside the web application workspace.

---

## 6. Systematic Academic Operating System

The application incorporates the top patterns from open-source student platforms (`study-buddy`, `DDL-Killer`, `StudyDesk`, `samwise`, `GradePoint`, `hoot`):

* **"Next Up" Anti-Procrastination Engine (Inspired by Limekana/StudyDesk & DDL Killer)**: Dynamic urgency algorithm `(Weight% * 1.5) + (Priority) / sqrt(HoursLeft)` calculating the single highest-impact task a student should tackle right now, with a **"1-Click Focus Sprint"** button that immediately primes the timer.
* **Exam Countdown Radar (Inspired by Hoot & Study-Buddy)**: Countdown tracking for Midterms, Quizzes, and Final presentations with urgency warning badges.
* **Weekly Class Timetable (`#timetable`) (Inspired by DDL Killer & Samwise)**: Time-blocked Monday–Friday lecture schedule with room numbers, instructors, attendance tracking, and **automated Free-Study Focus Windows** between classes.
* **"What-If" Final Exam Grade Forecaster (`#courses`) (Inspired by GradePoint & Helium)**: Reverse grade calculation showing the exact percentage needed on the final exam to secure a target letter grade (A, A-, B+, etc.).
* **Study Notes & Formula Sheets Hub (`#notes`) (Inspired by Hoot & Notion Student OS)**: Instant formula reference and concept cheat-sheets for multivariable calculus, algorithms, distributed systems, cellular biology, and classical mechanics with one-click clipboard copying.
* **Interactive Kanban Sprint Board (`#kanban`)**: 4-column academic stage board (`To Do`, `In Progress`, `Review / Draft`, `Completed`) with 1-click move arrows and drag & drop support.
* **Deep Study Pomodoro Focus Timer (`#pomodoro`)**: 25m Focus / 5m Break / 15m Long Break with **Web Audio ambient soundscapes** (Library Rain, White Noise, Ocean Waves) with zero external audio dependencies, persistent header widget, and task binding.
* **Courses & GPA Simulator (`#courses`)**: Real-time cumulative GPA calculations, credit load tracking, and syllabus weight breakdowns.
* **Eisenhower Urgency/Importance Matrix**: 4-quadrant task prioritization integrated directly into the All Tasks repository with a 1-click view switcher (`Table` / `Kanban` / `Matrix`).
* **Subtask Checklists in Quick-View**: Break complex course assignments into step-by-step checklists with progress percentage bars and inline item additions.
* **Bulk Syllabus & Task Importer**: Paste lines from course syllabi or LMS portals to batch-import an entire semester's assignments in seconds.
* **iCalendar (.ics) Sync**: Dynamic RFC 5545 `.ics` export generating instant 1-click calendar imports for Google Calendar, Apple Calendar, and Outlook.

---

## 7. Live Production Deployment

* **Live Demo**: [https://student-task-tracker-rho.vercel.app](https://student-task-tracker-rho.vercel.app)
* **GitHub Repository**: [https://github.com/j4yop/student-task-tracker](https://github.com/j4yop/student-task-tracker)


