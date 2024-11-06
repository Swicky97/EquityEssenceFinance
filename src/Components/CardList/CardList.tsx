import React, { SyntheticEvent } from 'react';
import { CompanySearch } from '../../company';
import Card from '../Card/Card';
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
};

const CardList: React.FC<Props> = ({ searchResults, onPortfolioCreate }: Props) => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuidv4()}
              searchResult={result}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p>
          No results!
        </p>
      )}
    </div>
  );
}

export default CardList

