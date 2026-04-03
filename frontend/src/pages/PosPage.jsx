File name: PosPage.jsx

import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { fetchProducts, createOrder } from '../api/orderApi';
import ProductList from '../components/POS/ProductList';
import Cart from '../components/POS/Cart';

const PosPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useStore((state) => [state.cart, state.setCart]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setTotalAmount((prevTotal) => prevTotal + product.price);
    };

    const handleCheckout = async () => {
        const orderData = {
            products: cart,
            totalAmount: totalAmount,
        };
        await createOrder(orderData);
        setCart([]);
        setTotalAmount(0);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
            <ProductList products={products} onAddToCart={handleAddToCart} />
            <Cart cart={cart} totalAmount={totalAmount} onCheckout={handleCheckout} />
        </div>
    );
};

export default PosPage;