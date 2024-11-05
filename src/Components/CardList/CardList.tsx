import React from 'react';
import Card from '../Card/Card';

interface Props {};

const CardList: React.FC<Props> = (props: Props) => {
  return (
    <div>
        <Card companyName="Apple" ticker="AAPL" price={100} />
        <Card companyName="Microsoft" ticker="MSFT" price={200} />
        <Card companyName="Apple" ticker="AAPL" price={300} />
    </div>
  );
}

export default CardList

