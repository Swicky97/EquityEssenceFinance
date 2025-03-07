import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import CashflowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import Discussion from "../Components/Discussion/Discussion";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "search", element: <ProtectedRoute><SearchPage /></ProtectedRoute> },
      { path: "design-guide", element: <DesignPage /> },
      {
        path: "company/:ticker",
        element: <ProtectedRoute><CompanyPage /></ProtectedRoute>,
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
          { path: "discussion", element: <Discussion /> },
        ],
      },
    ],
  },
]);
