File name: /pos-omnichannel/pos-omnichannel/frontend/src/pages/UsersPage.jsx

import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { fetchUsers } from '../api/authApi';

const UsersPage = () => {
    const { users, setUsers } = useStore();

    useEffect(() => {
        const getUsers = async () => {
            const userList = await fetchUsers();
            setUsers(userList);
        };
        getUsers();
    }, [setUsers]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-blue-500 hover:underline">Edit</button>
                                <button className="text-red-500 hover:underline ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;