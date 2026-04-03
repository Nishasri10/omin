# Project Overview

This project is an **Omnichannel Retail POS (Point of Sale) and Inventory Management System** designed to facilitate retail operations through a multi-role system. The application includes functionalities for managing users, products, orders, and analytics, catering to different roles such as Admin, Manager, and Cashier.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Testing Flow](#testing-flow)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JWT for authentication
  - Bcrypt for password hashing

- **Frontend:**
  - React.js
  - Tailwind CSS for styling
  - Zustand for state management
  - React Router for routing
  - Recharts for analytics charts

## Folder Structure

```
pos-omnichannel
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required packages:
   ```
   npm install express mongoose cors dotenv jsonwebtoken bcryptjs
   ```

3. Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Create a new Vite project:
   ```
   npm create vite
   ```

3. Install the required dependencies:
   ```
   npm install axios zustand react-router-dom recharts tailwindcss
   ```

4. Configure Tailwind CSS by following the instructions in the Tailwind documentation.

## Running the Application

### Starting the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Start the server:
   ```
   node src/server.js
   ```

### Starting the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Start the React application:
   ```
   npm run dev
   ```

### Connecting Both

Ensure that the backend server is running on a specified port (default is 5000) and the frontend is running on another port (default is 3000). The frontend will make API calls to the backend using the specified endpoints.

### Testing APIs with Postman

1. Open Postman.
2. Test the following endpoints:
   - **Authentication:**
     - POST `/api/auth/login`
     - POST `/api/auth/register`
   - **Products:**
     - GET `/api/products`
     - POST `/api/products`
   - **Orders:**
     - GET `/api/orders`
     - POST `/api/orders`

## Testing Flow

1. Create an admin user using the registration API.
2. Log in with the admin credentials.
3. Add a product using the product management API.
4. Use the POS system to create an order.
5. View analytics on the dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.