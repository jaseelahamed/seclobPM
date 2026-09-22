import React from "react";
import "./dashboard.scss";

const AdminHeader = ({
  selectedCategory,
  selectedSubcategory,
  onAddCategory,
  onAddSubcategory,
  onAddProduct,
}) => {
  return (
    <div className="admin-header">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Home &gt; {selectedCategory && `${selectedCategory.name} >`}{" "}
        {selectedSubcategory && selectedSubcategory}
      </div>

      {/* Buttons */}
      <div className="admin-actions">
        <button onClick={onAddCategory}>
          Add Category
        </button>
        <button onClick={onAddSubcategory}>
          Add Subcategory
        </button>
        <button onClick={onAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
