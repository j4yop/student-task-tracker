# Installation Guide

This document provides step‑by‑step instructions to get the **Student Task & Assignment Tracker** up and running locally or via Docker.

---

## Prerequisites

- **Node.js** v20+ (recommended) – https://nodejs.org/
- **npm** (comes with Node) or **yarn** if you prefer.
- **MongoDB** (local installation or Atlas connection string). If you don't have MongoDB installed, you can use the Docker‑Compose setup which will start a MongoDB container automatically.
- **Docker Desktop** (optional) – for containerised deployment.

---

## 1. Clone the Repository

```bash
git clone <repository-url>  # replace with actual URL if using Git
cd SE_PROJECT
```

---

## 2. Environment Variables

1. Copy the example file:

```bash
cp .env.example .env
```

2. Edit `.env` and set the required values (example below):

```dotenv
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/student_tracker

# JWT
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Misc
CORS_ORIGIN=http://localhost:5000
```

> **Note** – When using Docker, the `MONGODB_URI` is ignored; the container will connect to the internal MongoDB service automatically.

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Database Seeding (Optional but recommended)

The project ships with a seed script that creates demo users, categories, and tasks.

```bash
npm run seed
```

- **Admin** – `admin@tracker.com` / `AdminSecurePass123!`
- **Student** – `student@tracker.com` / `StudentPass123!`

---

## 5. Run the Application (Development Mode)

```bash
npm start
```

The server will start on **http://localhost:5000** and serve the SPA frontend automatically.

---

## 6. Run the Application with Docker

If you prefer an isolated environment, Docker Compose will spin up both the Node app and MongoDB:

```bash
docker-compose up --build
```

The containers will become healthy, seed data (if not already present), and expose the web UI at **http://localhost:5000**.

---

## 7. Testing

See the dedicated **Testing Guide** (`docs/TESTING.md`) for details on running unit, integration and coverage reports.

---

## 8. Troubleshooting

- **Port already in use** – Change the `PORT` variable in `.env` and restart.
- **MongoDB connection errors** – Ensure MongoDB is running, or check the connection string.
- **Missing environment variables** – Verify `.env` has all required keys.

---

## 9. Next Steps

- Explore the UI at `http://localhost:5000`.
- Use the provided Postman collection (`docs/postman_collection.json`) to experiment with the API.
- Review the **Architecture**, **Database**, and **API** documentation for deeper understanding.
