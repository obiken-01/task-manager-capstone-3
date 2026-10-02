import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanedTitle = title.trim();
    if (cleanedTitle === "") return;

    onAddTask(cleanedTitle, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task title"
        />
        <button type="submit">Add task</button>
      </div>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
      />
    </form>
  );
}

export default TaskForm;