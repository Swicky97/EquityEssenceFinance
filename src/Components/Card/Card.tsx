import React from 'react'
import { CompanySearch } from '../../company';

interface Props {
  id: string;
  searchResult: CompanySearch;
}

const Card: React.FC<Props> = ({ searchResult }: Props) => {
  return (
    <div className="card">
      <img alt="Company Logo" />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="info">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
    </div>
  )
}

export default Card
