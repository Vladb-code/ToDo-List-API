import { useEffect, memo } from "react";
import { useTodos } from "./TodoContext";
import Task from "./Task";

const ToDoList = memo(() => {
  const { filteredTasks, fetchTasks, loading } = useTodos();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading && filteredTasks.length === 0) return <p>Загрузка...</p>;

  return (
    <div className="list">
      {filteredTasks.map((t) => (
        <Task key={t.id} task={t} />
      ))}
    </div>
  );
});
export default ToDoList;
