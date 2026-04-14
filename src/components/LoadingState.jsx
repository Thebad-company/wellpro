import React from 'react';

export const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-8 animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'page') {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Hero Section */}
        <div className="h-96 bg-gray-200 rounded-2xl"></div>

        {/* Content Section */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-100 rounded mb-3"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-wellpro-green rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-white rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-wellpro-green border-r-wellpro-green rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-6 text-gray-600 font-sans">Loading your wellness content...</p>
      </div>
    </div>
  );
};
