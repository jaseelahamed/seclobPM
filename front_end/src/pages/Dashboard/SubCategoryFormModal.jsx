import React from "react";
import Select from "react-select";
import { Formik, Form } from "formik";

const SubCategoryFormModal = ({
  modalType,
  initialValues = { name: "", categoryId: "" },
  validationSchema,
  onSubmit,
  onCancel,
  categoryData = [],
}) => {
  if (modalType !== "subcategory") return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {/* Category Select */}
            <Select
              options={categoryData?.map((cat) => ({ value: cat?._id, label: cat?.name }))}
              value={categoryData?.map((cat) => ({ value: cat?._id, label: cat?.name }))?.find(o => o.value === formik.values.categoryId) || null}
              onChange={(option) => formik.setFieldValue("categoryId", option ? option.value : "")}
              onBlur={() => formik.setFieldTouched("categoryId", true)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: '#F4F8F5',
                  border: '1.85px solid #ccc',
                  borderRadius: '14px',
                  minHeight: '50px',
                  paddingLeft: '34px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '15.97px',
                  boxShadow: state.isFocused ? '0 0 0 1px #EDA415' : 'none',
                  borderColor: state.isFocused ? '#EDA415' : '#ccc',
                  '&:hover': {
                    borderColor: '#EDA415',
                  }
                }),
                option: (provided, state) => ({
                  ...provided,
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '15.97px',
                  backgroundColor: state.isSelected ? '#EDA415' : state.isFocused ? '#fdf5e6' : 'white',
                  color: state.isSelected ? 'white' : '#9A9A9A',
                  cursor: 'pointer',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#9A9A9A',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#9A9A9A',
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: '#9A9A9A',
                }),
              }}
              placeholder="Select category"
              isClearable
            />
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.categoryId}
              </div>
            )}

            {/* Subcategory Name Input */}
            <input
              type="text"
              {...formik.getFieldProps("name")}
              name="name"
              placeholder="Enter sub category name"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "15.97px",
                lineHeight: "100%",
                paddingLeft: "44px",
                height: "50px",
                borderRadius: "14px",
                border: "1.85px solid #ccc",
                backgroundColor: "#F4F8F5",
                color: "#9A9A9A",
              }}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.name}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#EDA415",
                  border: "none",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "15.25px",
                    color: "#3C3C3C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ADD
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  onCancel();
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#F4F8F5",
                  border: "1.5px solid #ccc",
                  color: "#3C3C3C",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "15.25px",
                    color: "#3C3C3C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  DISCARD
                </span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubCategoryFormModal;
