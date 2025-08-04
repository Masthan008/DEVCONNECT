import React from 'react';

const Input = React.forwardRef(({
  className = "",
  type = "text",
  placeholder,
  error,
  ...props
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const errorClasses = error ? "border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500" : "border-gray-300 text-gray-900 placeholder-gray-400";
  
  const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;
  
  return (
    <div className="w-full">
      <input
        type={type}
        className={combinedClasses}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;