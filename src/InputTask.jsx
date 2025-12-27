import { useState } from "react";
import { useTodos } from "./TodoContext";

const InputTask = () => {
  const [text, setText] = useState("");
  const { addTask } = useTodos();

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text.trim());
    setText("");
  };

  return (
    <div className="input-section">
      <input
        value={text}
        placeholder="Новая задача..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
};
export default InputTask;
