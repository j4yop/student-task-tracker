# Database Design

This document describes the MongoDB collections, schema details, indexes, and aggregation pipelines used by the **Student Task & Assignment Tracker**.

---

## Collections
| Collection | Purpose |
|------------|---------|
| `users` | Stores user credentials, role, and preferences. |
| `tasks` | Core task entities – title, description, due dates, status, priority, category reference, owner. |
| `categories` | User‑defined categories for tasks (name, colour). |
| `notifications` | History of system‑generated notifications (type, message, read flag). |
| `reminders` | Scheduled reminder entries linked to tasks (remindAt, sent flag). |
| `auditlogs` | Immutable log of security‑relevant actions (login, CRUD, role changes). |
| `userpreferences` | Per‑user UI settings (theme, email alerts, browser alerts). |

---

## Schema Highlights
### User (`models/User.js`)
```js
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student','admin'], default: 'student' },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```
Password is stored as a **bcrypt** hash.

### Task (`models/Task.js`)
```js
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['pending','completed','overdue'], default: 'pending' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```
Indexes on `owner` and `dueDate` support fast queries.

---

## Indexes
- `users.email` – unique, sparse.
- `tasks.owner` – for user‑scoped queries.
- `tasks.dueDate` – for reminder scheduler and overdue detection.
- `reminders.remindAt` – TTL index (expire after sent).
- `auditlogs.timestamp` – descending for recent activity queries.

---

## Aggregation Pipelines (Analytics)
### Weekly Completion Report
```js
db.tasks.aggregate([
  { $match: { status: 'completed', updatedAt: { $gte: ISODate('2026-01-01') } } },
  { $group: { _id: { $dayOfWeek: "$updatedAt" }, count: { $sum: 1 } } },
  { $project: { day: "$_id", count: 1, _id: 0 } },
  { $sort: { day: 1 } }
]);
```
### Monthly Category Distribution
```js
db.tasks.aggregate([
  { $match: { createdAt: { $gte: ISODate('2026-01-01') } } },
  { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'cat' } },
  { $unwind: '$cat' },
  { $group: { _id: '$cat.name', total: { $sum: 1 } } },
  { $project: { category: '$_id', total: 1, _id: 0 } },
  { $sort: { total: -1 } }
]);
```
These pipelines are wrapped in the **AnalyticsService** for the API endpoints.

---

## Data Relationships
- **User ↔ Task** – one‑to‑many (owner).
- **Category ↔ Task** – one‑to‑many (optional). Deleting a category re‑assigns tasks to a fallback "Uncategorized".
- **Task ↔ Reminder** – one‑to‑one. A reminder is created when a task has `remindMe=true`.
- **User ↔ Notification** – one‑to‑many.

---

*Diagram placeholders:* `docs/images/er_diagram.png`, `docs/images/collection_relationships.png`.
