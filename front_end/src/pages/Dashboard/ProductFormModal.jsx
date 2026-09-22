import React, { useState } from "react";
import { Formik, Form } from "formik";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { apiCall } from "../../services/apiCall";
import { Base_Url } from "../../services/base_url";
import VictorIcon from "../../assets/img/Vector.png";
import "./dashboard.scss";

const ProductFormModal = ({
  initialValues,
  validationSchema,
  onSubmit,
  onCancel,
  subcategoryData,
  isEditMode = false
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        if (!isEditMode) resetForm();
      }}
      enableReinitialize
    >
      {(formik) => {
        const handleAddVariant = () => {
          const newVariants = formik.values.variants
            ? [...formik.values.variants]
            : [];
          newVariants.push({
            ram: "",
            storage: "",
            price: "",
            qty: "",
          });
          formik.setFieldValue("variants", newVariants);
        };

        return (
          <Form className="product-modal-form">
            <div className="form-row">
              <div className="form-label-col">
                <label>Title :</label>
              </div>
              <div className="form-input-col">
                <input
                  type="text"
                  {...formik.getFieldProps("title")}
                  placeholder="Enter product name"
                  className="form-input"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-danger">{formik.errors.title}</div>
                ) : null}
              </div>
            </div>

            <div className="form-row">
              <div className="form-label-col">
                <label>Variants :</label>
              </div>
              <div className="form-input-col">
                {formik?.values?.variants?.map((variant, index) => (
                  <div key={index} className="variant-item">
                    <div className="variant-field">
                      <label>Ram:</label>
                      <input
                        type="text"
                        value={variant.ram}
                        onChange={(e) => {
                          const newVariants = [...formik.values.variants];
                          newVariants[index].ram = e.target.value;
                          formik.setFieldValue("variants", newVariants);
                        }}
                      />
                    </div>
                    <div className="variant-field">
                      <label>Price:</label>
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => {
                          const newVariants = [...formik.values.variants];
                          newVariants[index].price = e.target.value;
                          formik.setFieldValue("variants", newVariants);
                        }}
                      />
                    </div>
                    <div className="variant-field">
                      <label>QTY:</label>
                      <input
                        type="number"
                        value={variant.qty}
                        onChange={(e) => {
                          const newVariants = [...formik.values.variants];
                          newVariants[index].qty = e.target.value;
                          formik.setFieldValue("variants", newVariants);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={handleAddVariant} className="add-variant-btn">
                  Add variants
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-label-col">
                <label>Sub category :</label>
              </div>
              <div className="form-input-col">
                <Select
                  options={subcategoryData?.map((cat) => ({ value: cat?._id, label: cat?.name }))}
                  value={subcategoryData?.map((cat) => ({ value: cat?._id, label: cat?.name }))?.find(o => o.value === formik.values.subcategory) || null}
                  onChange={(option) => formik.setFieldValue("subcategory", option ? option.value : "")}
                  onBlur={() => formik.setFieldTouched("subcategory", true)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: '#F4F8F5',
                      border: '1.5px solid #ccc',
                      borderRadius: '0.8rem',
                      padding: '0.2rem',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.9rem',
                      boxShadow: state.isFocused ? '0 0 0 1px #EDA415' : 'none',
                      borderColor: state.isFocused ? '#EDA415' : '#ccc',
                      '&:hover': {
                        borderColor: '#EDA415',
                      }
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.9rem',
                      backgroundColor: state.isSelected ? '#EDA415' : state.isFocused ? '#fdf5e6' : 'white',
                      color: state.isSelected ? 'white' : '#3C3C3C',
                      cursor: 'pointer',
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#3C3C3C',
                    }),
                    indicatorSeparator: () => ({
                      display: 'none',
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: '#3C3C3C',
                    }),
                  }}
                  placeholder="Select subcategory"
                  isClearable
                />
                {formik.touched.subcategory && formik.errors.subcategory ? (
                  <div className="text-danger">{formik.errors.subcategory}</div>
                ) : null}
              </div>
            </div>

            <div className="form-row">
              <div className="form-label-col">
                <label>Description :</label>
              </div>
              <div className="form-input-col">
                <textarea
                  {...formik.getFieldProps("description")}
                  placeholder="Enter product description"
                  className="form-textarea"
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger">{formik.errors.description}</div>
                ) : null}
              </div>
            </div>

            <div className="form-row">
              <div className="form-label-col">
                <label>Upload image:</label>
              </div>
              <div className="form-input-col">
                <div className="image-upload-wrapper">
                  <input
                    id="image-upload-input"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const files = Array.from(e.target.files);
                      if (!files.length) return;

                      const formData = new FormData();
                      files.forEach((file) =>
                        formData.append("images", file)
                      );

                      try {
                        const response = await apiCall(
                          "post",
                          "/upload/images",
                          formData,
                          null,
                          true
                        );

                        const uploadedUrls = response.data.urls;

                        if (!uploadedUrls || !uploadedUrls.length) {
                          toast.error(
                            "No images uploaded. Please try again."
                          );
                          return;
                        }

                        if (selectedImageIndex !== null) {
                          const updatedImages = [
                            ...formik.values.images,
                          ];
                          updatedImages[selectedImageIndex] =
                            uploadedUrls[0];
                          formik.setFieldValue("images", updatedImages);
                          setSelectedImageIndex(null);
                        } else {
                          formik.setFieldValue("images", [
                            ...formik.values.images,
                            ...uploadedUrls,
                          ]);
                        }

                        e.target.value = "";
                      } catch (err) {
                        toast.error(
                          err.message || "Image upload failed"
                        );
                        e.target.value = "";
                      }
                    }}
                  />

                  {formik?.values?.images?.map((url, idx) => (
                    <React.Fragment key={idx}>
                      {url ? (
                        <img
                          src={
                            typeof url === "string" && url.startsWith("http")
                              ? url.replace("/api", "")
                              : `${Base_Url.replace("/api", "")}${url.replace("/api", "")}`
                          }
                          alt={`preview-${idx + 1}`}
                          className="image-preview"
                          onClick={() => {
                            setSelectedImageIndex(idx);
                            document.getElementById("image-upload-input").click();
                          }}
                        />
                      ) : (
                        <label
                          htmlFor="image-upload-input"
                          className="image-upload-placeholder"
                          onClick={() => setSelectedImageIndex(idx)}
                        >
                          <img src={VictorIcon} alt="upload" />
                        </label>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-add">
                {isEditMode ? "UPDATE" : "ADD"}
              </button>
              <button
                type="button"
                className="btn-discard"
                onClick={() => {
                  formik.resetForm();
                  onCancel();
                }}
              >
                DISCARD
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductFormModal;
