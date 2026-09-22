// src/components/Modal.jsx
import React from "react";

const Modal = ({ show, title, children, onClose }) => {
  if (!show) return null;
 const modalWidth = (title === "Add Product" || title === "Edit Product") ? "900px" : "400px";
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // clicking backdrop closes
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "8px",
          width: modalWidth,
          
          maxWidth: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "24px",
          boxSizing: "border-box",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Modal header */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h2  style={{
    margin: 0,
    fontSize: "23.73px",
    fontWeight: 600,
    fontFamily: "Montserrat, sans-serif",
    lineHeight: "100%",
    letterSpacing: "0%",
    textAlign: "center",
    verticalAlign: "middle",
                      color: "#3C3C3C",
    marginBottom:"30px",
    marginTop:"30px"
  }}>{title}</h2>
          
        </div>

        {/* <hr style={{ margin: "16px 0" }} /> */}

        {/* Modal content (injected via children) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>{children}</div>
          </div>
          {/* <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            
          </button> */}
    </div>
  );
};

export default Modal;
