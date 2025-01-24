import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/home"
        className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
