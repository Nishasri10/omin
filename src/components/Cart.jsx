import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkout = async () => {
    await API.post("/orders", {
      products: cart.map((i) => ({ productId: i._id, quantity: i.quantity })),
    });
    clearCart();
    alert("Order placed");
  };

  return (
    <div className="w-80 bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">Cart</h2>

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between">
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => removeFromCart(item._id)}>❌</button>
        </div>
      ))}

      <hr className="my-2" />
      <p>Total: ₹{total}</p>

      <button
        onClick={checkout}
        className="bg-green-500 text-white w-full mt-2 py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
}