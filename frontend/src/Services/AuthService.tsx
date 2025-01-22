import apiClient from "../apiClient";
import { HandleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await apiClient.post<UserProfileToken>("account/register", {
      email,
      username,
      password,
    });
    return response;
  }
  catch (error) {
    HandleError(error);
  }
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await apiClient.post<UserProfileToken>("account/login", {
      username,
      password,
    });
    return response;
  }
  catch (error) {
    HandleError(error);
  }
};
