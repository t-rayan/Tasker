import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../../app/hooks";

const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth?.user]);

  return (
    <div className="bg-neutral-100 h-screen flex items-center justify-center">
      <Toaster />
      <AuthForm />
    </div>
  );
};

export default AuthPage;
