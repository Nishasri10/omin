# README.md for Backend

# Omnichannel Retail POS and Inventory Management System - Backend

## Overview

This backend serves as the API for the Omnichannel Retail POS and Inventory Management System. It is built using Node.js, Express.js, and MongoDB. The backend handles user authentication, product management, and order processing.

## Features

- JWT Authentication
- Role-based access control (Admin, Manager, Cashier)
- CRUD operations for products
- Order management
- Inventory management

## Folder Structure

```
backend
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── services
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pos-omnichannel/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

### Required Packages

- express
- mongoose
- cors
- dotenv
- jsonwebtoken
- bcryptjs

## Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000` (or the port specified in your code).

## API Endpoints

- **Authentication**
  - `POST /api/auth/login` - Login user
  - `POST /api/auth/register` - Create new user

- **Products**
  - `GET /api/products` - Get all products
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

- **Orders**
  - `GET /api/orders` - Get all orders
  - `POST /api/orders` - Create a new order

## Testing APIs

You can use Postman or any API testing tool to test the endpoints. Make sure to include the JWT token in the headers for protected routes.

## Conclusion

This backend provides a robust API for managing an omnichannel retail POS and inventory management system. Follow the setup instructions to get started and explore the features.