// components/Toast.tsx
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
  position?: ToastPosition;
}

const bgColor = {
  success: "bg-green-100 border-green-400 text-green-800",
  error: "bg-red-100 border-red-400 text-red-800",
  info: "bg-blue-100 border-blue-400 text-blue-800",
};

const getPositionClasses = (position: ToastPosition) => {
  const base = "fixed z-50 m-4";
  switch (position) {
    case "top-left":
      return `${base} top-0 left-0`;
    case "top-right":
      return `${base} top-0 right-0`;
    case "bottom-left":
      return `${base} bottom-0 left-0`;
    case "bottom-right":
      return `${base} bottom-0 right-0`;
    default:
      return `${base} top-0 right-0`;
  }
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  position = "top-right",
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={getPositionClasses(position)}>
      <div
        className={`
          transform transition-all duration-300 ease-in-out
          ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          px-4 py-3 rounded-md border shadow-md min-w-[200px]
          ${bgColor[type]}
        `}
      >
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};
