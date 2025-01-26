import React, { SyntheticEvent } from "react";

interface Props {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const DeletePortfolio: React.FC<Props> = ({
  portfolioValue,
  onPortfolioDelete,
}: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button className="w-[48px] h-[48px] text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
