import { useState } from "react";
import { useAuth } from "./AuthContext";

const Register = ({ onRegisterSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    age: "",
  });
  const { setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, age: Number(form.age) }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Регистрация успешна!");
        onRegisterSuccess();
      } else {
        setError(data.message || "Ошибка регистрации");
      }
    } catch {
      setError("Ошибка сети");
    }
  };

  return (
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
    </form>
  );
};
export default Register;
