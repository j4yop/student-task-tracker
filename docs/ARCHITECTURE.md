# Architecture Overview

This document describes the high‑level architecture of the **Student Task & Assignment Tracker** project.

---

## 1. Layered Structure

```
Client (SPA)  <--->  Express API Server  <--->  MongoDB
```

- **Client** – Vanilla JavaScript SPA served as static assets. Handles routing, state, UI, Chart.js visualisations, and communicates with the backend via the Fetch API.
- **API Server** – Node.js/Express application following an **MVC** pattern:
  - **Models** – Mongoose schemas representing collections.
  - **Views** – Not used server‑side; the UI is purely client‑side.
  - **Controllers** – Business logic for each domain (auth, tasks, categories, analytics, admin, notifications).
  - **Middleware** – Security (Helmet, CORS, rate‑limiting), authentication (JWT), validation, audit logging, error handling.
- **Database** – MongoDB storing seven collections (Users, Tasks, Categories, Notifications, Reminders, UserPreferences, AuditLogs). Indexes are defined for fast look‑ups (e.g., email, task due dates).

---

## 2. Real‑Time Communication

- **Server‑Sent Events (SSE)** are used for push notifications (reminders, new task alerts). The `sseManager` utility creates a single `/api/notifications/stream` endpoint that streams JSON events to connected browsers.

---

## 3. Background Services

- **Reminder Scheduler** – A `node‑cron` job (`services/reminderScheduler.js`) scans the `Reminders` collection every minute and emits SSE events or writes mock email files.

---

## 4. Security Measures

| Concern | Implementation |
|---------|----------------|
| Authentication | JWT Access + Refresh tokens (HttpOnly cookie) |
| Authorization | Role‑based access control (Student, Admin) via `authMiddleware` |
| Input Sanitisation | `express-mongo-sanitize` and `xss-clean` middleware |
| Rate Limiting | `express-rate-limit` (default 100 req/min per IP) |
| Headers | Helmet with a strict CSP |
| Passwords | Bcrypt hash (12 rounds) |

---

## 5. Deployment

The application can be run directly (`npm start`) or containerised with Docker Compose (`docker-compose.yml`). The compose file defines two services: `app` (Node) and `mongo` (MongoDB). Health‑checks ensure the app starts only after MongoDB is ready.

---

## 6. Extensibility

- New modules can be added by creating a model, service, controller, and route following the existing pattern.
- Front‑end views follow a modular structure (`client/src/views/`) and can be extended without touching the core router.

---

*For visual diagrams (ER diagram, component flow) see the `docs/images/` folder – placeholders are provided.*
