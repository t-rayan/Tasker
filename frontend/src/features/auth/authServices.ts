import { normalInstance } from "../../helpers/AxiosHelper";
import Axios from "axios";
import { base_url } from "../../constants/api";

interface User {
  name: String;
  email: String;
}

interface UserRegisterData {
  name: String;
  email: String;
  password: String;
}

interface UserLoginData {
  email: String;
  password: String;
}

export const registerService = async (
  userRegisterData: UserRegisterData,
): Promise<any> => {
  const res = await normalInstance.post("/auth/register", userRegisterData);
  return res;
};

export const loginService = async (
  userLoginData: UserLoginData,
): Promise<any> => {
  const res = await Axios.post(`${base_url}/auth/login`, userLoginData);
  return res;
};

export const getProfileService = async (token: string): Promise<any> => {
  const res = await Axios.get(`${base_url}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const requestPasswordResetService = async (data: any): Promise<any> => {
  const res = await Axios.post(`${base_url}/auth/forget-password`, {
    email: data.email,
  });
  return res;
};
export const updatePasswordService = async (data: {
  token: string;
  password: string;
}): Promise<any> => {
  console.log(data);
  const res = await Axios.post(
    `${base_url}/auth/reset-password/${data.token}`,
    {
      password: data.password,
    },
  );
  return res;
};
