import { AuthProvider, useAuth } from "./AuthContext";
import { TodoProvider } from "./TodoContext";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import FilterBar from "./FilterBar";
import "./App.css";

const AppContent = () => {
  const { isAuth, logout, error } = useAuth();
  const [authMode, setAuthMode] = useState("login");

  if (!isAuth) {
    return (
      <div className="auth-container">
        <Header />
        {error && <p className="error-msg">{error}</p>}
        {authMode === "login" ? (
          <>
            <Login />
            <button className="switch-btn" onClick={() => setAuthMode("reg")}>
              Регистрация
            </button>
          </>
        ) : (
          <>
            <Register onRegisterSuccess={() => setAuthMode("login")} />
            <button className="switch-btn" onClick={() => setAuthMode("login")}>
              Уже есть аккаунт? Войти
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <button className="logout-btn" onClick={logout}>
          Выйти
        </button>
        <InputTask />

        <ToDoList />
        <FilterBar />
      </div>
    </TodoProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
