import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    await login(form);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="w-full mb-2 p-2 border" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full mb-2 p-2 border" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button onClick={submit} className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
}