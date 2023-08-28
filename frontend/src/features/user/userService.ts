import Axios from "axios";
import { base_url } from "../../constants/api";

export const getProfileService = async (token: string): Promise<any> => {
  const res = await Axios.get(`${base_url}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
