import classNames from "classnames";
import { ButtonType } from "../utils/interface/components/button.interface";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonType) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none transition duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-purple-800 text-purple-200 hover:bg-purple-200 hover:text-purple-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  const finalClassName = classNames(
    baseStyles,
    variants[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
