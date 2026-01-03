import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";
import Header from "./Header";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setError, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        login(data.token);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Ошибка сервера");
    }
  };

  return (
    <div className="auth-container">
      <Header />
      {error && (
        <p className="error-msg" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
        <Link to="/register" className="switch-btn">
          Нет аккаунта? Регистрация
        </Link>
      </form>
    </div>
  );
};

export default Login;
