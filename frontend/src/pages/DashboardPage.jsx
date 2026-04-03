File name: /pos-omnichannel/pos-omnichannel/frontend/src/pages/DashboardPage.jsx

import React from 'react';
import { useStore } from '../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const DashboardPage = () => {
    const { salesData, ordersData } = useStore(state => ({
        salesData: state.salesData,
        ordersData: state.ordersData,
    }));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Sales Overview</h2>
                    <LineChart width={500} height={300} data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Orders Overview</h2>
                    <BarChart width={500} height={300} data={ordersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;