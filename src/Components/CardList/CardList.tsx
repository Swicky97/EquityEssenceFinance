import React from 'react';
import { CompanySearch } from '../../company';
import Card from '../Card/Card';
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
};

const CardList: React.FC<Props> = ({ searchResults }: Props) => {
  return <>
    {searchResults.length > 0 ? (
      searchResults.map((result) => {
        return <Card id={result.symbol} key={uuidv4()} searchResult={result}/>
      })
    ): (
      <h1>No results found</h1>
    )}
  </>  
}

export default CardList

