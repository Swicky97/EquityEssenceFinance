import React from "react";
import { FaComment, FaHome, FaMoneyBill, FaTable } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {};

const MobileSidebar = (props: Props) => {
  return (
    <nav className="">
      <div className="flex flex-row flex-wrap pt-4 gap-x-4 gap-y-4 p-4 list-none">
        <Link
          to="company-profile"
          className="flex w-[150px] h-[50px] items-center p-2 font-bold rounded text-white bg-lightGreen transition duration-300 ease-in-out"
        >
          <FaHome className="ml-2" />
          <h6 className="px-3 text-xs">Company Profile</h6>
        </Link>
        <Link
          to="income-statement"
          className="flex w-[150px] h-[50px] items-center p-2 font-bold rounded text-white bg-lightGreen transition duration-300 ease-in-out"
        >
          <FaTable className="ml-2" />
          <h6 className="px-3 text-xs">Income Statement</h6>
        </Link>
        <Link
          to="balance-sheet"
          className="flex w-[150px] h-[50px] items-center p-2 font-bold rounded text-white bg-lightGreen transition duration-300 ease-in-out"
        >
          <FaTableCells className="ml-2" />
          <h6 className="px-3 text-xs">Balance Sheet</h6>
        </Link>
        <Link
          to="cashflow-statement"
          className="flex w-[150px] h-[50px] items-center p-2 font-bold rounded text-white bg-lightGreen transition duration-300 ease-in-out"
        >
          <FaMoneyBill className="ml-2" />
          <h6 className="px-3 text-xs">Cashflow Statement</h6>
        </Link>
        <Link
          to="discussion"
          className="flex w-[150px] h-[50px] items-center p-2 font-bold rounded text-white bg-lightGreen transition duration-300 ease-in-out"
        >
          <FaComment className="ml-2" />
          <h6 className="px-3 text-xs">Discussion</h6>
        </Link>
      </div>
    </nav>
  );
};

export default MobileSidebar;
