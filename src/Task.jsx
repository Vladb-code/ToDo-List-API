import { useState, memo } from "react";
import { useTodos } from "./TodoContext";

const Task = memo(({ task }) => {
  const { deleteTask, toggleTask, editTaskTitle } = useTodos();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (editText.trim() && editText !== task.title) {
      editTaskTitle(task.id, editText.trim());
    }
    setIsEdit(false);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleTask(task.id, task.isCompleted)}
        />

        {isEdit ? (
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <span
            className={task.isCompleted ? "done" : ""}
            onDoubleClick={() => setIsEdit(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="task-btns">
        <button onClick={() => (isEdit ? handleSave() : setIsEdit(true))}>
          {isEdit ? "↩︎" : "✎"}
        </button>
        <button className="del-btn" onClick={() => deleteTask(task.id)}>
          ×
        </button>
      </div>
    </div>
  );
});

export default Task;
