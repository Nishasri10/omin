File name: /pos-omnichannel/pos-omnichannel/frontend/src/pages/InventoryPage.jsx

import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { fetchProducts } from '../api/productApi';
import ProductList from '../components/Inventory/ProductList';

const InventoryPage = () => {
    const { products, setProducts } = useStore();

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        };

        loadProducts();
    }, [setProducts]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <ProductList products={products} />
        </div>
    );
};

export default InventoryPage;