import React, { SyntheticEvent } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio: React.FC<Props> = ({
  portfolioValues,
  onPortfolioDelete,
}: Props) => {
  return (
    <section id="portfolio">
      <div className="border-2 border-gray-200">
        <h2 className="py-2 text-1xl font-semibold text-left border-b-2 pl-2 md:text-2xl">
          Stock Watchlist
        </h2>
        <div className="max-w-5xl mx-auto">
          <>
            {portfolioValues.length > 0 ? (
              portfolioValues.map((portfolioValue) => {
                return (
                  <CardPortfolio
                    key={portfolioValue.id}
                    portfolioValue={portfolioValue}
                    onPortfolioDelete={onPortfolioDelete}
                  />
                );
              })
            ) : (
              <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                Your portfolio is empty.
              </h3>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default ListPortfolio;
