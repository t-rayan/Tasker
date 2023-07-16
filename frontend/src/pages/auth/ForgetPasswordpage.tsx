import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { requestPasswordResetAction } from "../../features/auth/authSlice";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    dispatch(requestPasswordResetAction({ email: data.email }));
  };

  return (
    <div className="h-screen bg-gray-200 grid place-items-center">
      <div className="w-full p-7 md:w-2/4 bg-white rounded-lg">
        <div>
          <h1 className="text-lg">Forget password</h1>
          <p className="mt-1 text-sm text-neutral-400">
            No worries, we`ll send you reset instructions
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              register={register}
              errors={errors}
              required
              placeholder="Enter your email"
              label="Email"
            />
            <div className="mt-7">
              <Button fullWidth type="submit">
                Reset Password
              </Button>
            </div>
          </form>
          <div className="w-full flex justify-center mt-5">
            <p
              className="text-sm text-neutral-400 cursor-pointer hover:underline hover:text-black"
              onClick={() => navigate(-1)}
            >
              Back to Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
