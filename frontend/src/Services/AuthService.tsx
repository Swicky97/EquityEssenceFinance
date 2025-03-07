import axios from "axios";
import { HandleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "/api/";

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    HandleError(error);
  }
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    HandleError(error);
  }
};

export const logoutAPI = async () => {
  try {
    await axios.post(api + "account/logout");
  }
  catch (error) {
    HandleError(error);
  }
}

export const refreshAPI = async () => {
  try {
    const res = await axios.get(api + "account/refresh");
    return res.data;
  }
  catch (error) {
    HandleError(error);
  }
}

