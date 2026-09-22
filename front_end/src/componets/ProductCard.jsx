import React from "react";
import Frame26Icon from "../assets/img/Frame 26.png";
import Frame28Icon from "../assets/img/Frame 28.png";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { useWishlist } from "../hooks/useWishlist"; 
import { toast } from "react-hot-toast";
import "../pages/Dashboard/dashboard.scss";
import { Base_Url } from "../services/base_url";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.products.some((p) => p._id === product._id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else {
      addToWishlist(product._id, {
        onSuccess: () => toast.success("Added to wishlist"),
      });
    }
  };

  const handleClick = () => {
    navigate(`${PATHS.PRODUCTSDETAILS}/${product._id}`); 
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="card-image-wrapper">
        <img
          src={`${Base_Url.replace('/api', '')}${product.images[0]?.replace('/api', '')}`}
          alt={product.title}
        />
        <button
          type="button"
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <img src={Frame28Icon} alt="wishlist icon" />
        </button>
      </div>

      <div className="card-details">
        <h6>{product?.title}</h6>
        <p className="price">₹{product?.variants?.[0]?.price || "N/A"}</p>
        <div className="stars">
           <img src={Frame26Icon} alt="stars" style={{width: 'auto', height: '0.8rem'}} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
