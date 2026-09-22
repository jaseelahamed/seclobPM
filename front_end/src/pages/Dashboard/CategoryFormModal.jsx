import React from "react";
import { Formik, Form } from "formik";

const CategoryFormModal = ({
  initialValues = { name: "" },
  validationSchema,
  onSubmit,
  onCancel,
  modalType, // you can optionally pass modalType for conditional rendering outside component
}) => {
  if (modalType !== "category") return null; // Only render if modalType is "category"

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
            <input
              {...formik.getFieldProps("name")}
              name="name"
              type="text"
              placeholder="Enter category name"
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
            {formik.errors.name && formik.touched.name && (
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

export default CategoryFormModal;
