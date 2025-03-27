import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { Console } from "console";

const api = `${process.env.REACT_APP_API_BASE_URL}/api/comment/`;

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
