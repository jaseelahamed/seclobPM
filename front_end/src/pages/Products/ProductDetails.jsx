import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import { getProductById } from "../../services/productapiCall";
import Frame28Icon from "../../assets/img/Frame 28.png";
import { useWishlist } from "../../hooks/useWishlist";
import { toast } from "react-hot-toast";
import { Base_Url } from "../../services/base_url";
import "./product-details.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const {
    data: product,
    isLoading,
    error,
  } = useFetchData("single-product", getProductById, id);

  const isInWishlist = wishlist?.products?.some((p) => p._id === product?._id);

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

  const [mainImage, setMainImage] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
    if (product?.variants?.length > 0) {
      setSelectedVariantId(product.variants[0]._id);
    }
  }, [product]);

  if (isLoading) return <p className="container mt-5">Loading...</p>;
  if (error) return <p className="container mt-5">Error loading product</p>;

  const selectedVariant = product?.variants?.find(v => v._id === selectedVariantId) || product?.variants?.[0];

  return (
    <div className="container mt-5 product-details-page mb-5">
      <div className="breadcrumb-nav">
        Home &gt; Product Details &gt;
      </div>

      <div className="row">
        {/* Image Gallery Section */}
        <div className="col-12 col-md-6 mb-4 mb-md-0 gallery-section">
          <div className="main-image-container">
            <img src={mainImage} alt="Main Product" />
          </div>

          <div className="thumbnail-row">
            {product?.images?.slice(0, 3).map((imgUrl, index) => {
              return (
                <div 
                  key={index} 
                  className={`thumbnail-container ${mainImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setMainImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="col-12 col-md-6 info-section">
          <h3 className="product-title">{product?.title}</h3>
          
          <h4 className="product-price">
            ₹{selectedVariant?.price || "N/A"}
          </h4>
          
          <p className="availability">
            Availability: <span className="status">✓ In stock</span>
          </p>
          
          <p className="stock-warning">
            Hurry up! only {selectedVariant?.qty || 0} product left in stock!
          </p>

          <hr />

          <div className="ram-selector">
            <span className="variant-label">Ram:</span>
            <div className="ram-options">
              {product?.variants?.map((variant) => (
                <button
                  key={variant?._id}
                  className={`ram-btn ${selectedVariantId === variant._id ? 'active' : ''}`}
                  onClick={() => setSelectedVariantId(variant._id)}
                >
                  {variant?.ram}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector mt-2">
            <span className="variant-label">Quantity :</span>
            <div className="input-group">
              <button 
                type="button"
                onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setQuantity(isNaN(val) || val < 1 ? 1 : val);
                }}
                min={1}
              />
              <button 
                type="button"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons mt-4">
            <button className="btn-primary">
              Edit product
            </button>
            <button className="btn-primary">
              Buy it now
            </button>
            <button 
              className={`btn-wishlist ${isInWishlist ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistClick();
              }}
            >
              <img src={Frame28Icon} alt="Wishlist" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
