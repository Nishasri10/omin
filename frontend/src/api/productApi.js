File name: /pos-omnichannel/pos-omnichannel/frontend/src/api/productApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Create a new product
export const createProduct = async (productData, token) => {
    const response = await axios.post(API_URL, productData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get all products
export const getProducts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get a product by ID
export const getProductById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Update a product
export const updateProduct = async (id, productData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Delete a product
export const deleteProduct = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Search products by barcode
export const searchProductByBarcode = async (barcode, token) => {
    const response = await axios.get(`${API_URL}/search?barcode=${barcode}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};