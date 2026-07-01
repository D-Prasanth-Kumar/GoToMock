import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import InterviewRoomPage from "./pages/InterviewRoomPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview/:sessionId"
        element={
          <ProtectedRoute>
            <InterviewRoomPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;