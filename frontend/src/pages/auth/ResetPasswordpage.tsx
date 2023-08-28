import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { Toaster } from "react-hot-toast";
import { RootState } from "../../app/store";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updatePasswordAction } from "../../features/auth/authSlice";

const ResetPasswordpage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = useParams();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
    if (newPassword !== "" && confirmPassword !== "") {
      if (newPassword === event.target.value) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(updatePasswordAction({ token: token, password: newPassword }));
  };

  return (
    <div className="h-screen bg-gray-200 grid place-items-center">
      <Toaster />
      <div className="w-full p-7 md:w-2/5 bg-white rounded-lg">
        <div>
          <h1 className="text-lg">Reset password</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Please enter your new password.
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label
                className="
                  block
                  text-sm
                  font-normal
                  leading-4
                  text-gray-700
                  dark:text-neutral-500
    "
                htmlFor="password"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={clsx(`
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
                      placeholder:text-gray-400
                      border-[1px]
                      dark:placeholder:text-neutral-600
                      dark:bg-darkCardBg
                      sm:text-sm
                      sm:leading-6
                      focus-visible:border-[0] focus-visible:ring-2 ring-blue-500 visited:bg-transparent`)}
                />
              </div>
            </div>

            <div className="mt-7">
              <label
                className="
                  block
                  text-sm
                  font-normal
                  leading-4
                  text-gray-700
                  dark:text-neutral-500
    "
                htmlFor="password"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="Retype password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
                      placeholder:text-gray-400
                      border-[1px]
                      dark:placeholder:text-neutral-600
                      dark:bg-darkCardBg
                      sm:text-sm
                      sm:leading-6
                      focus-visible:border-[0] focus-visible:ring-2 ring-blue-500 visited:bg-transparent`,
                    isMatch && "ring-2 ring-emerald-400 border-none",
                    confirmPassword && !isMatch && "ring-2 ring-pink-400",
                  )}
                />
              </div>
            </div>

            <div className="mt-7">
              <Button fullWidth disabled={!isMatch} type="submit">
                Proceed
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

export default ResetPasswordpage;
