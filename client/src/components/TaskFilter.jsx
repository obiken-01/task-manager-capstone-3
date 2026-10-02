const FILTERS = ["All", "Active", "Completed"];

function TaskFilter({ filter, onFilterChange, remaining }) {
  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {FILTERS.map((name) => (
          <button
            key={name}
            className={filter === name ? "active" : ""}
            aria-pressed={filter === name}
            onClick={() => onFilterChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <span className="remaining">
        {remaining} {remaining === 1 ? "task" : "tasks"} remaining
      </span>
    </div>
  );
}

export default TaskFilter;