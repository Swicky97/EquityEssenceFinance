import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
  bgColor: string;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
  bgColor
}: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col items-center justify-between w-full p-6 rounded-lg md:flex-row ${bgColor}`}
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center underline text-veryDarkViolet md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="font-bold text-veryDarkBlue pl-4">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
