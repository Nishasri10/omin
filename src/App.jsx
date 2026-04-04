import { Routes, Route, Navigate } from "react-router-dom";
import POS from "./pages/POS";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pos" element={<POS />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
