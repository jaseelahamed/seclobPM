import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import { getProductById, updateProduct } from "../../services/productapiCall";
import { getSUbCategories } from "../Dashboard/category-api";
import Frame28Icon from "../../assets/img/Frame 28.png";
import { useWishlist } from "../../hooks/useWishlist";
import { toast } from "react-hot-toast";
import { Base_Url } from "../../services/base_url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../componets/Modal";
import ProductFormModal from "../Dashboard/ProductFormModal";
import { ProductValidationSchema } from "../../utils/ValidationSchema";
import "./product-details.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const {
    data: product,
    isLoading,
    error,
  } = useFetchData("single-product", getProductById, id);

  const {
    data: subcategoryData,
  } = useFetchData("subcategory", getSUbCategories, null, null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const updateProductMutation = useMutation({
    mutationFn: (values) => {
      const trimmedValues = {
        ...values,
        variants: values?.variants?.map((v) => ({
          ram: v.ram?.trim() || "",
          price: Number(v.price),
          qty: Number(v.qty),
        })),
        images: values.images.filter((img) => img !== ""),
      };
      return updateProduct(id, trimmedValues);
    },
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["single-product", id]);
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product");
    }
  });

  const handleEditSubmit = (values) => {
    updateProductMutation.mutate(values);
  };

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

  const getInitialValues = () => {
    // Pad images to length 3 as expected by the form
    const formImages = [...(product?.images || [])];
    while(formImages.length < 3) {
      formImages.push("");
    }
    
    return {
      title: product?.title || "",
      description: product?.description || "",
      subcategory: product?.subcategory?._id || product?.subcategory || "",
      variants: product?.variants?.length > 0 
        ? product.variants.map(v => ({ ram: v.ram || "", storage: v.storage || "", price: v.price || "", qty: v.qty || "" }))
        : [{ ram: "", storage: "", price: "", qty: "" }],
      images: formImages.slice(0, 3),
    };
  };

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
            <button className="btn-primary" onClick={() => setIsEditModalOpen(true)}>
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

      {/* Edit Product Modal */}
      <Modal
        show={isEditModalOpen}
        title="Edit Product"
        onClose={() => setIsEditModalOpen(false)}
      >
        <ProductFormModal
          initialValues={getInitialValues()}
          validationSchema={ProductValidationSchema}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          subcategoryData={subcategoryData}
          isEditMode={true}
        />
      </Modal>
    </div>
  );
};

export default SingleProduct;
