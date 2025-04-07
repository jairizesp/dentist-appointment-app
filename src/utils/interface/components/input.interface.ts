export interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
  className?: string;
  required?: boolean;
  name?: string;
  type?: string;
}
