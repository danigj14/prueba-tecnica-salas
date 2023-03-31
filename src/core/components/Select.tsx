import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  const mergedStyle = twMerge(
    "relative inline-block bg-white border border-blue-dark rounded-[12px] hover:text-blue-dark-hover transition-all",
    className
  );

  return (
    <div className={mergedStyle}>
      <select
        className="p-2 pl-4 pr-12 bg-transparent appearance-none cursor-pointer"
        {...props}
      />
      <FontAwesomeIcon
        className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none"
        icon={faChevronDown}
      />
    </div>
  );
}
