import TaskItem from "./TaskItem.jsx";

const EMPTY_MESSAGES = {
  All: "No tasks here yet. Add your first task above to get started.",
  Active: "Nothing left to do. Nice work!",
  Completed: "No completed tasks yet.",
};

function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">{EMPTY_MESSAGES[filter]}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;