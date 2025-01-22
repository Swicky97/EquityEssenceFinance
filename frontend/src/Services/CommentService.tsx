import apiClient from "../apiClient";
import { HandleError } from "../Helpers/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string,
) => {
  try {
    const response = await apiClient.post<CommentPost>(`comment/${symbol}`, {
      title,
      content,
    });
    return response;
  } catch (error) {
    HandleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const response = await apiClient.get<CommentGet[]>(`comment/${symbol}`);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
