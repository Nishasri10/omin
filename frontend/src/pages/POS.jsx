import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext";

export default function POS() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <CartProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">POS System</h1>

        <div className="flex gap-6">
          <div className="grid grid-cols-3 gap-4 flex-1">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}