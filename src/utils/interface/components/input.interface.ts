export interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
  name?: string;
  type?: string;
}
