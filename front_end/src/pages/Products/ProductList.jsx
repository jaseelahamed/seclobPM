// src/pages/Products/ProductList.jsx
import React from "react";
import ProductCard from "../../componets/ProductCard";

const products = [
  {
    id: 1,
    name: "iPhone 15",
    variants: [
      { ram: "8GB", price: 999, qty: 10 },
      { ram: "16GB", price: 1100, qty: 5 },
    ],
  },
];

const ProductList = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;