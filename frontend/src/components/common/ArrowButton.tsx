import { Link } from "react-router";
import type { HTMLAttributes } from "react";

interface ArrowButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  direction?: "left" | "right";
}

export default function ArrowButton({
  to,
  direction = "left",
  className = "",
  ...props
}: ArrowButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg 
                bg-background-dark text-gray-400 hover:text-white 
                hover:bg-background-light transition-colors ${className}`}
      {...props}
    >
      <svg
        className={`w-5 h-5 ${direction === "right" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </Link>
  );
} 