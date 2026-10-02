const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Request failed");
  }
  return result;
}

export async function getTasks() {
  const result = await request(API_URL);
  return result.data;
}

export async function createTask(task) {
  const result = await request(API_URL, {
    method: "POST",
    body: JSON.stringify(task),
  });
  return result.data;
}

export async function updateTaskStatus(id, completed) {
  const result = await request(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return result.data;
}

export async function deleteTask(id) {
  await request(`${API_URL}/${id}`, { method: "DELETE" });
}