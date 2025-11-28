// src/components/Button.jsx
import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  primary = true,
  icon: Icon,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-lg shadow-md transition-all duration-200 
      ${
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400"
      } 
      ${
        disabled || loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }
      ${className}`}
  >
    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
    {!loading && Icon && <Icon className="w-5 h-5" />}
    <span>{children}</span>
  </button>
);

export default Button;
