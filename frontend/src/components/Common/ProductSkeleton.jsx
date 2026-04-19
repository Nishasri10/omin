import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export const StatsCardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg animate-pulse">
      <div className="flex justify-between">
        <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="mt-4 h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-80 bg-gray-100 rounded-lg"></div>
    </div>
  );
};