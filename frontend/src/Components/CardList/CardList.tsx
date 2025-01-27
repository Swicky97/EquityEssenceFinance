import React, { SyntheticEvent } from "react";
import Card from "../Card/Card";
import { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
  hasSearched: boolean; // Add a prop to track if a search has been made
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
  hasSearched,
}: Props): JSX.Element => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Card
            id={result.symbol}
            key={uuidv4()}
            searchResult={result}
            onPortfolioCreate={onPortfolioCreate}
            bgColor={index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}
          />
        ))
      ) : hasSearched ? (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      ) : null}
    </div>
  );
};

export default CardList;
