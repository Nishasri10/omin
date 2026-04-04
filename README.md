# Frontend README.md

# Frontend Setup and Usage

## Project Overview

This project is a full-stack Omnichannel Retail Point of Sale (POS) and Inventory Management System. The frontend is built using React.js, Tailwind CSS, and Zustand for state management. It provides a user-friendly interface for different roles: Admin, Manager, and Cashier.

## Folder Structure

```
frontend
├── src
│   ├── api
│   ├── components
│   ├── pages
│   ├── store
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── tailwind.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Installation Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd pos-omnichannel/frontend
```

### Step 2: Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

### Required Packages

- axios
- zustand
- react-router-dom
- recharts
- tailwindcss

### Step 3: Configure Tailwind CSS

Ensure that Tailwind CSS is properly configured in `tailwind.config.js` and `postcss.config.js`. The default configuration should work for most cases.

## Running the Application

### Step 1: Start the Development Server

Run the following command to start the frontend application:

```bash
npm run dev
```

### Step 2: Access the Application

Open your web browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Connecting to the Backend

Ensure that the backend server is running. The frontend will make API calls to the backend for authentication, product management, and order processing.

## Testing the Application

1. **Create an Admin User**: Use the Admin login page to create a new admin user.
2. **Login**: Log in as Admin, Manager, or Cashier using the respective login pages.
3. **Add Product**: Navigate to the Inventory page and add a new product.
4. **Use POS**: Go to the POS page to create an order.
5. **View Analytics**: Access the dashboard to view sales and order analytics.

## Conclusion

This frontend application is designed to work seamlessly with the backend API. Follow the setup instructions carefully to ensure a smooth development experience. For any issues, please refer to the backend documentation or reach out for support.