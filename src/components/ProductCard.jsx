import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{product.name}</h3>
      <p>₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>
  );
}