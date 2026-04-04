import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid gap-4">
        {orders.map((o) => (
          <div key={o._id} className="bg-white p-4 rounded shadow">
            ₹{o.totalAmount}
          </div>
        ))}
      </div>
    </Layout>
  );
}