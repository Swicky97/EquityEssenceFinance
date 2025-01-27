import React from "react";
import { useOutletContext } from "react-router";
import StockComment from "../StockComment/StockComment";

type Props = {};

const Discussion = (props: Props) => {
  const ticker = useOutletContext<string>();
  return (
    <>
      <StockComment stockSymbol={ticker} />
    </>
  );  
}

export default Discussion;

