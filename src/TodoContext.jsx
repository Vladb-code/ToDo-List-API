import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const { token } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("https://todo-redev.herokuapp.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addTask = async (title) => {
    const res = await fetch(" https://todo-redev.herokuapp.com/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const deleteTask = useCallback(
    async (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    [token]
  );

  const toggleTask = useCallback(
    async (id, currentStatus) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isCompleted: !currentStatus } : t
        )
      );
      await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isCompleted: !currentStatus }),
        }
      );
    },
    [token]
  );

  const clearCompleted = async () => {
    const completed = tasks.filter((t) => t.isCompleted);
    if (completed.length === 0) return;

    setLoading(true);
    try {
      await Promise.all(
        completed.map((task) =>
          fetch(`https://todo-redev.herokuapp.com/api/todos/${task.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setTasks((prev) => prev.filter((t) => !t.isCompleted));
    } catch (err) {
      console.error("Ошибка при очистке:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "active") return !t.isCompleted;
      if (filter === "completed") return t.isCompleted;
      return true;
    });
  }, [tasks, filter]);
  const editTaskTitle = useCallback(
    async (id, newTitle) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
      );

      try {
        const res = await fetch(
          `https://todo-redev.herokuapp.com/api/todos/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newTitle }),
          }
        );
        if (!res.ok) throw new Error();
      } catch (err) {
        console.error("Ошибка при изменении названия");
      }
    },
    [token]
  );

  return (
    <TodoContext.Provider
      value={{
        filteredTasks,
        loading,
        filter,
        setFilter,
        fetchTasks,
        addTask,
        deleteTask,
        toggleTask,
        clearCompleted,
        editTaskTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
