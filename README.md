# Task Manager

A task manager app with a React client and an Express API backed by MongoDB.

## Frontend Setup

From the project root, install and start the React client:

```bash
cd client
npm install
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Backend Setup

From the project root, install and start the backend:

```bash
cd server
npm install
```

Create a `server/.env` file with your MongoDB connection string. Keep this file private and do not commit real credentials.

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/task_manager
```

Start the development server:

```bash
npm run dev
```

The API is available at `http://localhost:5000` by default. The server connects to MongoDB before it starts listening.

## API Endpoints

All task endpoints use the `/api/tasks` path. Send and receive JSON with the `Content-Type: application/json` header when a request has a body.

### Health check

`GET /`

Returns a message when the API is running.

### List and filter tasks

`GET /api/tasks`

Optional query parameters:

| Parameter | Values | Default | Description |
| --- | --- | --- | --- |
| `taskStatus` | `all`, `active`, `completed` | `all` | `active` returns tasks with `completed: false`; `completed` returns tasks with `completed: true`. |
| `sort` | A task field, such as `title` or `-title` | `title` | Sort ascending by default; prefix a field with `-` to sort descending. |

Examples:

```text
GET /api/tasks?taskStatus=active
GET /api/tasks?taskStatus=completed&sort=-title
GET /api/tasks?taskStatus=all
```

The response includes `success`, the number of matching tasks in `count`, and the task array in `data`.

### Create a task

`POST /api/tasks`

The `title` is required. `description` is optional, and `completed` defaults to `false`.

```json
{
	"title": "Prepare project demo",
	"description": "Review the task manager before presenting",
	"completed": false
}
```

Returns the created task with status `201`.

### Mark a task completed or active

`PATCH /api/tasks/:id`

Replace `:id` with the task's MongoDB ID. The `completed` value must be a boolean:

```json
{
	"completed": true
}
```

Send `false` to mark the task active. Returns `400` for a missing or non-boolean `completed` value, or `404` if the task does not exist.

### Delete a task

`DELETE /api/tasks/:id`

Replace `:id` with the task's MongoDB ID. Returns a success message, or `404` if the task does not exist.
