import React from "react";


const ProductForm = ({ formValues, setFormValues, categories }) => {
  return (
    <div className="p-6 bg-white rounded shadow w-full">
      {/* Product Name Row */}
      <div className="grid grid-cols-12 items-center gap-4 mb-4">
        <label className="col-span-4 font-medium">Product Name</label>
        <input
          type="text"
          className="col-span-8 border border-gray-300 rounded px-3 py-2"
          placeholder="Enter product name"
          value={formValues.productName}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, productName: e.target.value }))
          }
        />
      </div>

      {/* Variant Input (can be enhanced to support dynamic addition) */}
      <div className="grid grid-cols-12 items-center gap-4 mb-4">
        <label className="col-span-4 font-medium">Variants</label>
        <input
          type="text"
          className="col-span-8 border border-gray-300 rounded px-3 py-2"
          placeholder="Enter product variant (e.g., Small, Medium, etc.)"
          value={formValues.productVariant}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, productVariant: e.target.value }))
          }
        />
      </div>

      {/* Subcategory Select */}
      <div className="grid grid-cols-12 items-center gap-4 mb-4">
        <label className="col-span-4 font-medium">Subcategory</label>
        <select
          className="col-span-8 border border-gray-300 rounded px-3 py-2"
          value={formValues.productSubcategory}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, productSubcategory: e.target.value }))
          }
        >
          <option value="">Select subcategory</option>
          {categories
            .find((c) => c.name === formValues.productCategory)
            ?.subcategories.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
        </select>
      </div>

      {/* Description */}
      <div className="grid grid-cols-12 items-start gap-4 mb-4">
        <label className="col-span-4 font-medium mt-2">Description</label>
        <textarea
          className="col-span-8 border border-gray-300 rounded px-3 py-2"
          rows="4"
          placeholder="Enter product description"
          value={formValues.productDescription}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, productDescription: e.target.value }))
          }
        ></textarea>
      </div>

      {/* Image Uploads */}
      <div className="grid grid-cols-12 items-center gap-4 mb-4">
        <label className="col-span-4 font-medium">Product Images</label>
        <div className="col-span-8 space-y-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="file"
              className="block w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormValues((prev) => {
                  const updatedImages = [...(prev.productImages || [])];
                  updatedImages[i] = file;
                  return { ...prev, productImages: updatedImages };
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        className="w-full mt-4 bg-blue-800 text-white py-2 px-4 rounded font-medium hover:bg-blue-900"
        onClick={() => console.log("Save Product", formValues)}
      >
        Save Product
      </button>
    </div>
  );
};

export default ProductForm;
