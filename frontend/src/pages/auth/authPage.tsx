import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../../app/hooks";

const AuthPage = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="bg-neutral-200 dark:bg-darkBg h-screen flex items-center justify-center">
      <Toaster />
      <AuthForm />
    </div>
  );
};

export default AuthPage;
