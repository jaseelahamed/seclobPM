// src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <a href="/app" className="block py-2 px-3 rounded hover:bg-gray-700">
          Dashboard
        </a>
        <a href="/app/products" className="block py-2 px-3 rounded hover:bg-gray-700">
          Products
        </a>
        <a href="/app/categories" className="block py-2 px-3 rounded hover:bg-gray-700">
          Categories
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;