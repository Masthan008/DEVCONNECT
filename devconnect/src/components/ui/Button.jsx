import React from 'react';

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-500",
  link: "bg-transparent text-blue-600 hover:underline focus:ring-blue-500",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const buttonSizes = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = buttonVariants[variant] || buttonVariants.default;
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;