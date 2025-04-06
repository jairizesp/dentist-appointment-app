type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

export interface ButtonType {
  key: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
