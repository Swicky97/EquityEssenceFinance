import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = `${process.env.REACT_APP_API_BASE_URL}/api/comment/`;

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string,
  getAccessTokenSilently: any
) => {
  try {
    const token = await getAccessTokenSilently();
    
    const data = await axios.post<CommentPost>(
      api + `${symbol}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const commentGetAPI = async (symbol: string, getAccessTokenSilently: any) => {
  try {
    const token = await getAccessTokenSilently();
    
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};