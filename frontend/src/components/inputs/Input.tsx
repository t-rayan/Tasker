"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
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
    text-gray-900"
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
            form-input
            block
            w-full
            rounded-xl
            py-2
            px-4
            border-[2px]
            text-gray-900
            shadow-sm
            outline-none
            placeholder:text-gray-400
            sm:text-sm
            sm:leading-6
          `,
            errors[id]
              ? " focus-visible:border-rose-500"
              : "focus-visible:border-[0] focus-visible:bg-neutral-100",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
