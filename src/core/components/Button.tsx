import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  const mergedStyle = twMerge(
    "py-2 px-6 bg-blue-dark text-white rounded-[12px]",
    className
  );

  return <button className={mergedStyle} {...props} />;
}
