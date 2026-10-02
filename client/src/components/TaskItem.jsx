function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? "task-item completed" : "task-item"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "completed"}`}
      />
      <div className="task-text">
        <span className="task-title">{task.title}</span>
        {task.description && <span className="task-description">{task.description}</span>}
      </div>
      <button className="delete-button" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;