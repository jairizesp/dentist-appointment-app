type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

export interface ButtonType {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}
