"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
  name?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}) => {
  return (
    <div>
      <label
        className="
    block
    text-sm
    font-medium
    leading-6
    text-gray-700
    dark:text-neutral-500
    "
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id, { required })}
          className={clsx(
            `
            appearance-none
            form-input
            block
            w-full
            rounded-lg
            py-2
            px-4
            dark:border-darkCardBg
            dark:text-neutral-500
            outline-none
            placeholder:text-gray-500
            border-[1px]
            dark:placeholder:text-neutral-600
            dark:bg-darkCardBg
            sm:text-sm
            sm:leading-6
          `,
            errors[id]
              ? "focus-visible:ring-2 focus-visible: ring-rose-500"
              : "focus-visible:border-[0] focus-visible:ring-2 ring-blue-500 visited:bg-transparent",
            disabled && "opacity-50 cursor-default",
          )}
        />
      </div>
    </div>
  );
};

export default Input;
