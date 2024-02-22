
import React from "react";

function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="py-2 px-3 w-24 bg-transparent border border-black border-solid rounded-md focus:outline-blue-500"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
