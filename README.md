# Student Task & Assignment Tracker

This application tracks academic tasks, deadlines, course schedules, and grades.

- **Live Application**: [student-task-tracker-rho.vercel.app](https://student-task-tracker-rho.vercel.app)
- **Source Repository**: [github.com/j4yop/student-task-tracker](https://github.com/j4yop/student-task-tracker)

---

## 1. System Architecture

The application uses a three-tier architecture:

```
[ Web Browser (Client) ]
       │
       ├── 1. Static Assets (HTML5, CSS3, ES6 JS) ──> [ Vercel Edge CDN ]
       │
       └── 2. REST API Requests (/api/*) ───────────> [ Node.js / Express Serverless ]
                                                              │
                                                              └──> [ MongoDB Database ]
```

### 1.1 Architecture Components

- **Presentation Layer (Frontend)**:
  - Single-Page Application (SPA) located in the `public/` directory.
  - Vercel Edge CDN serves static assets directly with low latency.
  - State management uses a client-side reactive store.
- **Application Layer (Backend)**:
  - Node.js and Express REST API located in the `api/` directory.
  - JSON Web Tokens (JWT) manage authentication and route security.
  - Rate limiting, Helmet, and input sanitizers secure all endpoints.
- **Data Layer (Database)**:
  - MongoDB stores users, tasks, categories, reminders, and audit records.
  - Mongoose models validate all schemas and constraints.

---

## 2. System Workflow

The application operates through three primary workflows:

### 2.1 Task Management Workflow
1. **Input**: The user creates tasks manually or imports assignments from a syllabus.
2. **Prioritization**: The engine calculates task urgency scores with this formula:
   $$\text{Urgency Score} = (\text{Weight} \times 1.5) + \frac{\text{Priority}}{\sqrt{\text{Hours Left}}}$$
3. **Execution**: The user selects a task view: Table, Kanban Board, or Eisenhower Matrix.
4. **Completion**: The user toggles task completion status. The application logs the event.

### 2.2 Study and Focus Workflow
1. The user launches the Pomodoro focus timer from the dashboard or header.
2. The user selects a work interval (25 minutes) or a break interval (5 or 15 minutes).
3. The Web Audio synthesizer generates ambient soundscapes (Rain, White Noise, Ocean Waves) directly in the browser.
4. The timer notifies the user when the interval expires.

### 2.3 Academic Grade Workflow
1. The user enters course details, credit hours, and current grades.
2. The system computes the current cumulative Grade Point Average (GPA).
3. The user opens the What-If calculator.
4. The system calculates the minimum final exam score required to achieve a target letter grade.

---

## 3. Technology Stack

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+) | Application state, DOM rendering, client-side routing |
| | Modern CSS3 | Slate and Cyan design system, CSS Grid, Flexbox, responsive layouts |
| | HTML5 | Semantic structure and accessible modal overlays |
| | Web Audio API | Procedural sound synthesis with zero audio file downloads |
| | Chart.js | Visual analytics and weekly progress charts |
| **Backend** | Node.js (v20+) | JavaScript runtime environment |
| | Express.js | REST API routing and middleware pipeline |
| | JWT & bcryptjs | Token authentication and password hashing |
| | Helmet & CORS | HTTP security headers and cross-origin controls |
| **Database** | MongoDB | Document database |
| | Mongoose | Object Data Modeling (ODM) and schema validation |
| **Testing** | Jest & Supertest | Automated API, security, and unit test suites |
| **Deployment**| Vercel | Global CDN for static files and Serverless Functions for API |
| | Docker | Container orchestration via `docker-compose.yml` |

---

## 4. Primary Features

- **Next-Up Engine**: Identifies the single most urgent academic task.
- **Class Timetable**: 5-day lecture calendar with automatic free-study window detection.
- **Kanban Board**: Drag-and-drop sprint board across four status columns.
- **Eisenhower Matrix**: Four-quadrant urgency and importance classification.
- **Pomodoro Timer**: Work and rest intervals with synthesized ambient soundscapes.
- **Grade Forecaster**: What-If final exam score calculator based on course weights.
- **Formula Hub**: Quick search and clipboard copy for academic formula sheets.
- **Bulk Importer**: Plain text and CSV syllabus parser.
- **Calendar Sync**: Dynamic RFC 5545 `.ics` export for calendar applications.

---

## 5. Installation and Execution

### 5.1 Prerequisites
- Node.js (v20 or newer)
- MongoDB (local instance or MongoDB Atlas connection string)

### 5.2 Local Setup
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Create your environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Populate database with seed data:
   ```bash
   npm run seed
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser at `http://localhost:5000`.

### 5.3 Docker Setup
Run the application and database together in Docker containers:
```bash
docker-compose up --build
```

---

## 6. Verification and Testing

Execute the automated test suite:
```bash
npm test
```
The suite runs 13 automated tests covering:
- Authentication and token lifecycle (`tests/auth.test.js`)
- Task repository operations (`tests/tasks.test.js`)
- Security headers, CORS, and input sanitization (`tests/security.test.js`)
