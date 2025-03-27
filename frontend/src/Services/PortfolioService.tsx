import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = `${process.env.REACT_APP_API_BASE_URL}/api/portfolio/`;

export const portfolioAddAPI = async (symbol: string, getAccessTokenSilently: any) => {
  try {
    const token = await getAccessTokenSilently();
    
    const data = await axios.post<PortfolioPost>(
      api + `?symbol=${symbol}`,
      {},
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

export const portfolioGetAPI = async (getAccessTokenSilently: any) => {
  try {
    const token = await getAccessTokenSilently();
    
    const data = await axios.get<PortfolioGet[]>(api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string, getAccessTokenSilently: any) => {
  try {
    const token = await getAccessTokenSilently();
    
    const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


