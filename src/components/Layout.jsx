import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded mb-4">Logout</button>
        {children}
      </div>
    </div>
  );
}
