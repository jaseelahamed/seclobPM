import React from "react";
import ProductCard from "../../componets/ProductCard";
import "./dashboard.scss";

const CategoryFilter = ({
  categoryData = [],
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  handleCategoryClick,
  products = [],
  arrowdownIcon,
  arrowdownIcon2,
  setFilters,
  loading
}) => {
  return (
    <div className="row" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start" }}>

      <div className="col-12 col-lg-3 col-md-4 category-sidebar mb-4">
        <h4>Categories</h4>
        <h4
          className="all-categories"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              subcategory: "",
              page: 1,
            }))
          }
        >
          All categories
        </h4>

        <ul className="category-list">
          {categoryData?.map((categoryItem, idx) => (
            <li key={idx} className="category-item">
              <div
                className={`category-header ${selectedCategory?._id === categoryItem?._id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(categoryItem);
                  setSelectedSubcategory(null);
                }}
              >
                <span>{categoryItem?.name}</span>
                <img
                  src={selectedCategory?._id === categoryItem?._id ? arrowdownIcon : arrowdownIcon2}
                  alt="toggle"
                />
              </div>

             
              {selectedCategory?._id === categoryItem?._id && (
                <ul className="subcategory-list">
                  {categoryItem?.subcategories?.length > 0 ? (
                    categoryItem?.subcategories?.map((subcategory, subIdx) => (
                      <li
                        key={subIdx}
                        className={`subcategory-item ${selectedSubcategory === subcategory.name ? 'active' : ''}`}
                        onClick={() => {
                          handleCategoryClick(subcategory);
                          setSelectedSubcategory(subcategory.name);
                        }}
                      >
                        <div className={`checkbox-box ${selectedSubcategory === subcategory.name ? 'checked' : ''}`}>
                          {selectedSubcategory === subcategory.name && "✓"}
                        </div>
                        <span>{subcategory.name}</span>
                      </li>
                    ))
                  ) : (
                    <li className="subcategory-item" style={{color: '#999'}}>No subcategories found</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

   
      <div className="col-12 col-lg-9 col-md-8">
        <div className="row">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="col-6 col-lg-4 mb-4">
                <div className="product-card skeleton">
                  <div className="card-image-wrapper skeleton-img"></div>
                  <div className="card-details">
                    <div className="skeleton-text title"></div>
                    <div className="skeleton-text price"></div>
                    <div className="skeleton-text stars"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {products?.map((prod, index) => (
                <div key={index} className="col-6 col-lg-4 mb-4">
                  <ProductCard product={prod} />
                </div>
              ))}

              {products?.length === 0 && (
                <div className="col-12">
                  <p>No products found for the selected category/subcategory.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
