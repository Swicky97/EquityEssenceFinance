import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import Discussion from "../Components/Discussion/Discussion";
import { AuthenticationGuard } from "./AuthenticationGuard";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Components/Spinner/Spinner";

const AppRoutes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <Spinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />} />
      <Route path="/design-guide" element={<DesignPage />} />
      <Route path="/company/:ticker" element={<AuthenticationGuard component={CompanyPage} />}>
        <Route path="company-profile" element={<AuthenticationGuard component={CompanyProfile} />} />
        <Route path="income-statement" element={<AuthenticationGuard component={IncomeStatement} />} />
        <Route path="balance-sheet" element={<AuthenticationGuard component={BalanceSheet} />} />
        <Route path="cashflow-statement" element={<AuthenticationGuard component={CashflowStatement} />} />
        <Route path="discussion" element={<AuthenticationGuard component={Discussion} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
