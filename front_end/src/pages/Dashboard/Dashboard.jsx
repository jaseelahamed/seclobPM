import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowdownIcon from "../../assets/img/arrow-down.png";
import arrowdownIcon2 from "../../assets/img/arrow-down2.png";

import VictorIcon from "../../assets/img/Vector.png";
import Modal from "../../componets/Modal";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import {
  CategorySchema,
  ProductValidationSchema,
  SubCategoryValidationSchema,
} from "../../utils/ValidationSchema";
import { toast } from "react-hot-toast";
import {
  addCategory,
  addProduct,
  addSubCategory,
  getCategories,
  getSUbCategories,
} from "./category-api";
import { useMutation } from "@tanstack/react-query";

import useFetchData from "../../hooks/use-fetch-data";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../../componets/ProductCard";
import { apiCall } from "../../services/apiCall";
import Pagination from "../../componets/Pagination ";
import AdminHeader from "./AdminHeader";
import CategoryFilter from "./CategoryFilter";
import CategoryFormModal from "./CategoryFormModal";
import SubCategoryFormModal from "./SubCategoryFormModal";
import ProductFormModal from "./ProductFormModal";
import { Base_Url } from "../../services/base_url";
import { useAuth } from "../../providers/AuthProvider";
const Dashboard = () => {
  const {
    products: PtoductList,
    loading,
    error: producterror,
    filters,
    refetch: refetchProduct,
    setFilters,
  } = useProductContext();
  console.log(PtoductList, "PtoductListPtoductListPtoductList");

  const [modalType, setModalType] = useState(null);
  const { user } = useAuth();

  const {
    data: categoryData,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
  } = useFetchData("category", getCategories, null, null);
  const {
    data: subcategoryData,
    // isLoading,
    refetch:subcategoryRefetch,
    // isFetching,
    // isError,
    // error,
  } = useFetchData("subcategory", getSUbCategories, null, null);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    subcategory: "",
    variants: [{ ram: "", storage: "", price: "", qty: "" }],
    images: ["", "", ""],
  });

  const addProductMutation = useMutation({
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
      return addProduct(trimmedValues);
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      refetchProduct();

      setFormValues({
        title: "",
        description: "",
        subcategory: "",
        variants: [{ ram: "", storage: "", price: "", qty: "" }],
        images: ["", "", ""],
      });
      if (handleClose) handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (values) => {
    addProductMutation.mutate(values);
  };


  const handleClose = () => {
    setModalType(null);
    // Optionally reset form:
    setFormValues({
      title: "",
      description: "",
      subcategory: "",
      variants: [{ ram: "", storage: "", price: "", qty: "" }],
      images: ["", "", ""],
    });
  };

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (subcategory) => {
    if (selectedCategory?._id === subcategory._id) {
      setSelectedCategory(null);
      setFilters((prev) => ({
        ...prev,

        subcategory: "",
        page: 1,
      }));
    } else {
      setSelectedCategory(subcategory?.name);
      setFilters((prev) => ({
        ...prev,
        subcategory: subcategory?._id,

        page: 1,
      }));
    }
    console.log("Clicked subcategory:", subcategory);
  };

  const addCategoryMutation = useMutation({
    mutationFn: (values) => addCategory(values),
    onSuccess: () => {
      toast.success("Category added successfully");
      refetch();
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
    },
  });
  const addSubCategoryMutation = useMutation({
    mutationFn: (values) => addSubCategory(values),
    onSuccess: () => {
      toast.success("Category added successfully");
      refetch();
      subcategoryRefetch()
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
    },
  });
  const handleSubmitCategory = (values) => {
    console.log("Submitting category...", values);
    addCategoryMutation.mutate(values);
  };
  const handleSubmitSubCategory = (values) => {
    console.log("Submitting category...", values);
    addSubCategoryMutation.mutate(values);
  };

  const inputStyle = {
    width: "100px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    backgroundColor: "#F4F8F5",
    color: "#333",
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState();
  return (
    <>
      <div className="container mt-4">
        {user?.role === "admin" && (
          <AdminHeader
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onAddCategory={() => setModalType("category")}
            onAddSubcategory={() => setModalType("subcategory")}
            onAddProduct={() => setModalType("product")}
          />
        )}
      </div>

      <div className="container mt-4">
         <CategoryFilter
      categoryData={categoryData}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubcategory={selectedSubcategory}
      setSelectedSubcategory={setSelectedSubcategory}
      handleCategoryClick={handleCategoryClick}
      products={PtoductList}
      arrowdownIcon={arrowdownIcon}
          arrowdownIcon2={arrowdownIcon2}
          setFilters={setFilters}
    />
        
      </div>
      <Pagination />
      {/* ===== Dynamic Modal ===== */}
      <Modal
        show={modalType !== null}
        title={
          modalType === "category"
            ? "Add Category"
            : modalType === "subcategory"
            ? "Add Sub category"
            : "Add Product"
        }
        onClose={handleClose}
      >
  
      
         <CategoryFormModal
        modalType={modalType}
        initialValues={{ name: "" }}
        validationSchema={CategorySchema}
        onSubmit={handleSubmitCategory}
        onCancel={handleClose}
      />

      
<SubCategoryFormModal
        modalType={modalType}
        initialValues={{ name: "", categoryId: "" }}
        validationSchema={SubCategoryValidationSchema}
        onSubmit={handleSubmitSubCategory}
        onCancel={handleClose}
        categoryData={categoryData}
      />
        {modalType === "product" && (
          <ProductFormModal
            initialValues={formValues}
            validationSchema={ProductValidationSchema}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            subcategoryData={subcategoryData}
          />
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
