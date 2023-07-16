import clsx from "clsx";
import React from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { FiCheck, FiCheckCircle, FiCircle } from "react-icons/fi";

interface CheckboxProps {
  name: string;
  isCompleted?: boolean;
  defaultValue?: boolean;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  action?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  register,
  name,
  isCompleted,
  action,
  defaultValue = false,
}) => {
  return (
    <div
      className={clsx(`cursor-pointer text-neutral-600 dark:text-neutral-500`)}
      onClick={action}
    >
      {/* <input
        type="checkbox"
        className=" form-checkbox appearance-none h-4 w-4 bg-transparent text-red-600 ring-2 rounded-full ring-purple-600 focus:ring-purple-800 "
        {...register(name)}
        name={name}
        // checked={isChecked}
        // defaultChecked={defaultValue}
        onChange={action}
        checked={isCompleted}
        // className={`${isCompleted} ? 'bg-red-400': 'bg-blue-400 accent-purple-700'`}
      />
      <span className="absolute top-0 left-0">r</span> */}
      {!isCompleted ? <FiCircle size={18} /> : <FiCheckCircle size={18} />}
    </div>
  );
};

export default Checkbox;
