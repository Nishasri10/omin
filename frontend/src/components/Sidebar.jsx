import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col gap-4">
      <h2 className="text-xl font-bold">POS System</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/products">Products</Link>
      <Link to="/orders">Orders</Link>
    </div>
  );
}
