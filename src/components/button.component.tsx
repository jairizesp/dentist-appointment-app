import classNames from "classnames";
import { ButtonType } from "../utils/interface/components/button.interface";
import Spinner from "./spinnert.component";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false,
}: ButtonType) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none transition duration-200 cursor-pointer flex justify-center items-center ";

  const variants = {
    primary:
      "bg-purple-800 text-purple-200 hover:bg-purple-200 hover:text-purple-800 active:scale-95 disabled:bg-purple-300 disabled:text-purple-500",
    secondary:
      "px-4 py-2 cursor-pointer active:scale-95 hover:bg-purple-800 hover:text-purple-200 rounded-md border border-purple-500 disabled:bg-gray-200 disabled:text-gray-800 disabled:border disabled:border-gray-800",
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
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
