import React from "react";

const Input = ({ label, field, form, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...field}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {form.touched[field.name] && form.errors[field.name] ? (
        <p className="text-red-500 text-xs mt-1">{form.errors[field.name]}</p>
      ) : null}
    </div>
  );
};

export default Input;