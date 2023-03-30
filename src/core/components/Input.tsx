import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  const mergedStyle = twMerge(
    "p-2 px-4 border border-blue-dark rounded-[12px]",
    className
  );

  return <input className={mergedStyle} {...props} />;
}
