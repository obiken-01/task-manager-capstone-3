import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskFilter from "./components/TaskFilter.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "./api/taskApi.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks once when the page opens
  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTask(title, description) {
    try {
      const newTask = await createTask({ title, description });
      setTasks((previousTasks) => [...previousTasks, newTask]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(id) {
    const task = tasks.find((t) => t._id === id);
    try {
      const updatedTask = await updateTaskStatus(id, !task.completed);
      setTasks((previousTasks) =>
        previousTasks.map((t) => (t._id === id ? updatedTask : t))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      setTasks((previousTasks) => previousTasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">Stay on top of your to-dos</p>
      </header>

      <TaskForm onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} remaining={remainingTasks} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="status">Loading tasks…</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={removeTask}
        />
      )}
    </main>
  );
}

export default App;