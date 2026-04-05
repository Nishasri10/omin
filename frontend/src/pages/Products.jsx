import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "", sku: "", category: "" });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async () => {
    await API.post("/products", form);
    fetchProducts();
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Products</h2>
       <div className="grid grid-cols-2 gap-2 mb-6">
        <input className="border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2" placeholder="Stock" onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <input className="border p-2" placeholder="SKU" onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        <input className="border p-2" placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
      </div>

      <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Product</button>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}