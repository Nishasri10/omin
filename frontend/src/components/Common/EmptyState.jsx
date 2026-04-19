import React from 'react';
import { ShoppingBag, Heart, Package, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ type, title, message, actionLink, actionText }) => {
  const icons = {
    cart: <ShoppingBag className="h-16 w-16 text-gray-300" />,
    wishlist: <Heart className="h-16 w-16 text-gray-300" />,
    orders: <Package className="h-16 w-16 text-gray-300" />,
    search: <Search className="h-16 w-16 text-gray-300" />,
  };

  const defaultMessages = {
    cart: {
      title: 'Your cart is empty',
      message: 'Looks like you haven\'t added any items to your cart yet.',
      actionLink: '/products',
      actionText: 'Start Shopping',
    },
    wishlist: {
      title: 'Your wishlist is empty',
      message: 'Save your favorite items here for later purchase.',
      actionLink: '/products',
      actionText: 'Browse Products',
    },
    orders: {
      title: 'No orders yet',
      message: 'Start shopping to see your orders here!',
      actionLink: '/products',
      actionText: 'Start Shopping',
    },
    search: {
      title: 'No products found',
      message: 'Try adjusting your search or filter to find what you\'re looking for.',
      actionLink: '/products',
      actionText: 'Clear Filters',
    },
  };

  const data = defaultMessages[type] || { title, message, actionLink, actionText };

  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
      <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-4 mb-4">
        {icons[type] || icons.cart}
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">{data.title}</h2>
      <p className="mt-3 text-gray-600">{data.message}</p>
      {data.actionLink && (
        <Link 
          to={data.actionLink} 
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white font-semibold hover:shadow-lg transition-all"
        >
          {data.actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;