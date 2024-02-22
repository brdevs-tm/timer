import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      className="px-5 py-2 border border-black border-solid rounded-md hover:outline-blue-500 hover:bg-slate-50 hover:border-white transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
