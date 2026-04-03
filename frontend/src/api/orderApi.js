File name: /pos-omnichannel/pos-omnichannel/frontend/src/api/orderApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
};

export const updateOrder = async (orderId, orderData) => {
    const response = await axios.put(`${API_URL}/${orderId}`, orderData);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    const response = await axios.delete(`${API_URL}/${orderId}`);
    return response.data;
};