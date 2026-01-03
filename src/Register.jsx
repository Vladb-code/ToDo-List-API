import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
  });
  const { setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      if (res.ok) {
        alert("Успешно!");
        navigate("/login");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch {
      setError("Ошибка сети");
    }
  };

  return (
    <div className="auth-container">
      <h1>ToDo List</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <input
          placeholder="Логин"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-mail"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <input
          type="number"
          placeholder="Возраст"
          required
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <button type="submit">Создать аккаунт</button>
        <Link to="/login">Есть аккаунт? Войти</Link>
      </form>
    </div>
  );
};
export default Register;
