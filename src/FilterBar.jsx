import { useTodos } from "./TodoContext";

const FilterBar = () => {
  const { filter, setFilter, clearCompleted, loading } = useTodos();

  return (
    <div className="filter-bar">
      <div className="filter-btns">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Активные
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Готовые
        </button>
      </div>
      <button
        className="clear-completed"
        onClick={clearCompleted}
        disabled={loading}
      >
        Очистить выполненные
      </button>
    </div>
  );
};

export default FilterBar;
