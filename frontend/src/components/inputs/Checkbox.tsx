import React from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";

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
    <input
      type="checkbox"
      {...register(name)}
      name={name}
      // checked={isChecked}
      defaultChecked={defaultValue}
      onChange={action}
    />
  );
};

export default Checkbox;
