import React, { SyntheticEvent, useEffect, useState } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";
import { getCompanyProfile } from "../../../api";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  const [price, setPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getStockPrice = async () => {
      try {
        const result = await getCompanyProfile(portfolioValue.symbol);
        setPrice(result?.data[0].price);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };
    getStockPrice();
  }, []);

  return (
    <div className="flex justify-between items-center border-b-2">
      <Link
        to={`/company/${portfolioValue.symbol}/company-profile`}
        className="flex-grow hover:bg-gray-100 cursor-pointer flex justify-between p-3 border-r-2"
      >
        <span className="text-xl font-bold flex items-center">{portfolioValue.symbol}</span>
        <div className="text-xl font-bold flex items-center">${price?.toFixed(2)}</div>
      </Link>
      <DeletePortfolio
        portfolioValue={portfolioValue.symbol}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
