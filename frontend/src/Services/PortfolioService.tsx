import apiClient from "../apiClient";
import { HandleError } from "../Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const response = await apiClient.post<PortfolioPost>(`portfolio`, null, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

// Get the portfolio list
export const portfolioGetAPI = async () => {
  try {
    const response = await apiClient.get<PortfolioGet[]>(`portfolio`);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

// Delete a portfolio item by symbol
export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const response = await apiClient.delete<PortfolioPost>(`portfolio`, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};
