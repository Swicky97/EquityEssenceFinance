import React, { SyntheticEvent, useEffect, useState } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";
import { CompanyProfile } from "../../../company";
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
    <div className="flex justify-between p-4 my-4 rounded-lg shadow-lg bg-slate-100">
      <Link
        to={`/company/${portfolioValue.symbol}/company-profile`}
        className="h-[48px] w-[96px] border-2 rounded-lg bg-lightGreen hover:bg-white border-lightGreen flex items-center justify-center"
      >
        <span className="text-xl font-bold">{portfolioValue.symbol}</span>
      </Link>
      <div className="text-xl font-bold flex items-center">{price}</div>
      <DeletePortfolio
        portfolioValue={portfolioValue.symbol}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
