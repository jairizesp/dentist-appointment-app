import React from "react";
import classNames from "classnames";
import { InputType } from "../utils/interface/components/input.interface";

const Input: React.FC<InputType> = ({
  label,
  error,
  className = "",
  required,
  name,
  type,
  ...props
}: InputType) => {
  const baseInputStyles =
    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const finalInputClassName = classNames(
    baseInputStyles,
    {
      "border-red-500 focus:ring-red-500": !!error,
      "border-gray-300": !error,
    },
    className
  );

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {required && <span className="text-red-600">*</span>}
          {label}
        </label>
      )}
      <input
        required={required}
        name={name}
        className={finalInputClassName}
        type={type ?? "text"}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
