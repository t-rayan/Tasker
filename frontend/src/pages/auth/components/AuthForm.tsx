import { useCallback, useEffect, useState } from "react";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { toast } from "react-hot-toast";

import Button from "../../../components/Button";
import Input from "../../../components/inputs/Input";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginAction, registerAction } from "../../../features/auth/authSlice";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "REGISTER") {
      dispatch(registerAction(data));
    } else if (variant === "LOGIN") {
      // call login action from auth slice
      dispatch(loginAction({ email: data.email, password: data.password }));
    }
  };
  return (
    <div
      className="
      mt-8 
      px-8
      sm:mx-auto 
      w-full
      md:w-2/3
      lg:w-2/4
      xl:w-2/5
      "
    >
      <div
        className="
        bg-neutral-50
          px-8
          py-8 
          rounded-md
          "
      >
        <div className="mb-7">
          <h1 className="font-bold text-xl">
            {variant === "LOGIN" ? "Welcome back 👋" : "Welcome to Tasker 🙏"}
          </h1>
          <h1 className="mt-1 font-semibold text-sm text-neutral-500">
            {variant === "LOGIN"
              ? "Please login to continue"
              : "Please register for new account."}
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <div>
            <Button disabled={isLoading} type="submit" fullWidth>
              {variant === "LOGIN" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        {/*  */}
        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
          text-gray-500"
        >
          <div>
            {variant === "LOGIN"
              ? "Dont have an account ?"
              : "Already have an account ?"}
          </div>
          <div
            onClick={() => toggleVariant()}
            className="underline cursor-pointer"
          >
            {variant === "LOGIN" ? "Create an account" : "Log In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
