import React from "react";
import { useWishlist } from "../hooks/useWishlist";
import heartIcon from "../assets/img/heart.png";
import { Base_Url } from "../services/base_url";
import { toast } from "react-hot-toast";
import "./wishlist-sidebar.scss";

const WishlistSidebar = ({ show, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleDelete = (productId) => {
    removeFromWishlist(productId, {
      onSuccess: () => toast.success("Removed from wishlist"),
      onError: (err) => toast.error(err.message || "Failed to remove item"),
    });
  };

  return (
    <div className={`wishlist-sidebar ${show ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="header-title-area">
          <div className="icon-circle">
            <img src={heartIcon} alt="Wishlist" />
          </div>
          <h2>Items</h2>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close sidebar">
          &#10095; {/* Right chevron > */}
        </button>
      </div>

      {/* Sidebar content area */}
      <div className="sidebar-content">
        {(!wishlist?.products || wishlist.products.length === 0) ? (
          <p className="empty-state">No products in wishlist.</p>
        ) : (
          wishlist.products.map((product) => {
            const serverUrl = Base_Url.replace('/api', '');
            const cleanImgPath = product.images?.[0]?.replace('/api', '') || '';
            
            return (
              <div key={product._id} className="wishlist-item">
                <div className="item-image">
                  <img
                    src={`${serverUrl}${cleanImgPath}`}
                    alt={product.title}
                  />
                </div>
                <div className="item-details">
                  <h4 className="item-title">{product.title}</h4>
                  <p className="item-price">₹{product.price || product?.variants?.[0]?.price || "0.00"}</p>
                  <div className="item-stars">
                    &#9733; &#9733; &#9733; &#9733; &#9733;
                  </div>
                </div>
                <button 
                  className="item-delete"
                  onClick={() => handleDelete(product._id)}
                  aria-label="Remove item"
                >
                  &#10005; {/* Cross X */}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;
