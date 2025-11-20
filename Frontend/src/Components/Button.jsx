
import react from 'react';
const Button = ({ children, onClick, primary = true, icon: Icon, disabled = false, loading = false, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`flex items-center justify-center space-x-2 px-4 py-2 font-semibold transition-all duration-200 rounded-lg shadow-md ${
      primary 
        ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'
    } ${disabled || loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
  >
    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
    {!loading && Icon && <Icon className="w-5 h-5" />}
    <span>{children}</span>
  </button>
);
export default Button;