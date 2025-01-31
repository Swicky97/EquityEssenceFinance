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
        <button className="w-[52px] h-[52px] text-black text-1xl duration-200 hover:bg-red-500 hover:text-white">
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
