import React from "react";
import { FaComment, FaHome, FaMoneyBill, FaTable } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const MobileSidebar = () => {
  const location = useLocation();

  const tabs = [
    { to: "company-profile", icon: <FaHome />, label: "Company Profile" },
    { to: "income-statement", icon: <FaTable />, label: "Income Statement" },
    { to: "balance-sheet", icon: <FaTableCells />, label: "Balance Sheet" },
    { to: "cashflow-statement", icon: <FaMoneyBill />, label: "Cashflow Statement" },
    { to: "discussion", icon: <FaComment />, label: "Discussion" },
  ];

  return (
    <nav className="p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map(({ to, icon, label }) => {
          const isActive = location.pathname.includes(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex underline transition duration-300 ease-in-out
                ${isActive ? "text-black font-bold" : "text-gray-700"}`}
            >
              <span>{icon}</span>
              <h6 className="px-2 text-xs">{label}</h6>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileSidebar;
