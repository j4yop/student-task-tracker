# API Documentation

This document lists all public REST endpoints exposed by the **Student Task & Assignment Tracker** backend.

---

## Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user (student). Validates email, password strength, and creates default preferences. |
| `POST` | `/api/auth/login` | Public | Authenticate with email & password. Returns **access token** (JSON body) and sets **refresh token** as HttpOnly cookie. |
| `POST` | `/api/auth/logout` | Authenticated | Clears refresh token cookie and invalidates it server‑side. |
| `POST` | `/api/auth/refresh-token` | Public (refresh cookie) | Rotates refresh token and issues a new short‑lived access token. |
| `GET`  | `/api/auth/profile` | Authenticated | Returns current user profile (email, role, preferences). |
| `PUT`  | `/api/auth/profile` | Authenticated | Update profile fields (name, preferences, etc.). |
| `PUT`  | `/api/auth/profile/password` | Authenticated | Change password – requires current password verification. |
| `POST` | `/api/auth/forgot-password` | Public | Generates a password‑reset token and **mocks** email delivery (written to `server/logs/emails/`). |
| `POST` | `/api/auth/reset-password` | Public | Consumes reset token and sets a new password. |

---

## Category Module (`/api/categories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/categories` | Authenticated | List all categories belonging to the user (including default system categories). |
| `POST` | `/api/categories` | Authenticated | Create a new user‑defined category (name must be unique per user). |
| `PUT`  | `/api/categories/:id` | Authenticated | Update category name or colour. |
| `DELETE`| `/api/categories/:id` | Authenticated | Delete a category – all tasks referencing it are re‑assigned to a fallback category. |

---

## Task Module (`/api/tasks`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/tasks` | Authenticated | Retrieve paginated list of tasks. Supports query parameters: `search`, `status`, `priority`, `category`, `dueDateFrom`, `dueDateTo`, `sortBy`, `page`, `limit`. |
| `POST` | `/api/tasks` | Authenticated | Create a new task. Optional `remindMe` schedules a reminder. |
| `GET`  | `/api/tasks/:id` | Authenticated | Get details of a single task (must belong to the user). |
| `PUT`  | `/api/tasks/:id` | Authenticated | Update task fields. May trigger reminder reschedule. |
| `DELETE`| `/api/tasks/:id` | Authenticated | Delete a task and its associated reminder. |
| `PATCH`| `/api/tasks/:id/complete` | Authenticated | Toggle completion status (`completed` ↔ `pending`). |
| `PATCH`| `/api/tasks/bulk/complete` | Authenticated | Bulk‑complete an array of task IDs (JSON body: `{ ids: [...] }`). |
| `PATCH`| `/api/tasks/bulk/delete` | Authenticated | Bulk‑delete tasks (JSON body: `{ ids: [...] }`). |
| `PATCH`| `/api/tasks/bulk/category` | Authenticated | Re‑assign multiple tasks to a new category (`{ ids: [...], categoryId: "..." }`). |

---

## Analytics (`/api/analytics`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/analytics/dashboard-stats` | Authenticated | Returns aggregated counts: total tasks, completed, pending, overdue, upcoming deadlines. |
| `GET` | `/api/analytics/reports/weekly` | Authenticated | Weekly breakdown of task completions (Monday‑Sunday). |
| `GET` | `/api/analytics/reports/monthly` | Authenticated | Monthly aggregation grouped by category. |

---

## Notification (`/api/notifications`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/notifications` | Authenticated | Fetch recent notifications (paginated). |
| `PUT`  | `/api/notifications/:id/read` | Authenticated | Mark a single notification as read. |
| `PATCH`| `/api/notifications/read-all` | Authenticated | Mark **all** unread notifications as read. |
| `DELETE`| `/api/notifications/clear-all` | Authenticated | Delete all notification records for the user. |
| `GET`  | `/api/notifications/stream` | Authenticated | **Server‑Sent Events** endpoint for real‑time push notifications. |

---

## Admin (`/api/admin`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/admin/users` | **Admin only** | List all registered users with role information. |
| `PUT`  | `/api/admin/users/:id/role` | **Admin only** | Change a user's role (`student` ↔ `admin`). |
| `GET`  | `/api/admin/audit-logs` | **Admin only** | Retrieve audit logs with optional filters (`action`, `userId`, `dateFrom`, `dateTo`). |
| `GET`  | `/api/admin/system-stats` | **Admin only** | High‑level metrics: total users, tasks, categories, audit entries. |

---

## Common Response Format
All successful responses use the following JSON envelope:
```json
{
  "status": "success",
  "data": { /* payload */ },
  "message": "Optional human‑readable description"
}
```
Error responses follow:
```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "Validation failed",
    "details": ["email is required", "password must be at least 8 characters"]
  }
}
```

---

## Pagination
Endpoints that return collections accept `page` (default 1) and `limit` (default 20) query parameters and include pagination metadata in the `data` object:
```json
"data": {
  "items": [...],
  "meta": {
    "total": 124,
    "page": 2,
    "limit": 20,
    "pages": 7
  }
}
```

---

*All endpoints are version‑agnostic – future versions may be prefixed with `/api/v1`.*
