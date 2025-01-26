import React, { SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="w-full flex justify-between items-center p-4 mb-4 rounded-lg shadow-lg bg-slate-100">
      <Link
        to={`/company/${portfolioValue.symbol}/company-profile`}
        className="h-[48px] w-[96px] border-2 rounded-lg bg-lightGreen hover:bg-white border-lightGreen flex items-center justify-center"
      >
        <span className="text-xl font-bold leading-none">{portfolioValue.symbol}</span>
      </Link>
      <DeletePortfolio
        portfolioValue={portfolioValue.symbol}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default CardPortfolio;
