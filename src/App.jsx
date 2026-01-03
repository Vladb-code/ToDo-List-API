import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "./AuthContext";
import { TodoProvider } from "./TodoContext";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import FilterBar from "./FilterBar";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
};

const TodoApp = () => {
  const { logout } = useAuth();
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/ToDo-List-API">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoApp />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
