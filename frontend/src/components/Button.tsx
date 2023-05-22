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
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
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
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900 " : "text-white",
        secondary &&
          "border-[1px] border-gray-900 rounded-md hover:shadow-sm hover:bg-gray-900 hover:text-gray-100 transition ",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible: outline-rose-600",
        !secondary &&
          !danger &&
          "bg-neutral-900 hover:shadow-lg hover:scale-95 transition focus-visible: outline-neutral-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
