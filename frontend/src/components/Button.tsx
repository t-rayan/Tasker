"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  sm?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  sm,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        `
    flex
    justify-center
    rounded-md
    px-3
    py-3
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2`,
        sm && "text-xs py-1 px-1",
        disabled && "opacity-40 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900 " : "text-white dark:text-neutral-400",
        secondary &&
          "border-[1px] border-gray-900 rounded-md hover:shadow-sm hover:bg-gray-900 hover:text-gray-100 transition ",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible: outline-rose-600",
        !secondary &&
          !danger &&
          "bg-darkBg dark:text-neutral-500 ring-2 ring-darkCardBg transition-transform hover:scale-105 ease-in-out duration-300 focus-visible: outline-none"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
