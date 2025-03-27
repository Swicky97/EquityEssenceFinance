import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getPortfolio();
  }, [])

  const getPortfolio = () => {
    portfolioGetAPI(getAccessTokenSilently)
    .then((res) => {
      if (res?.data)
      {
        console.log(res?.data);
        setPortfolioValues(res?.data);
      }
    }).catch((e) => {
      toast.warning("Could not get portfolio values");
    })
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value)
    portfolioAddAPI(e.target[0].value, getAccessTokenSilently)
    .then((res) => {
      console.log(res?.status)
      if (res?.status === 201) {
        toast.success("Stock added to portfolio");
        getPortfolio();
      }
    }).catch((e) => {
      toast.warning("Could not create portfolio item");
    })
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value, getAccessTokenSilently)
    .then((res) => {
      if (res?.status === 200) {
        toast.success("Stock deleted from portfolio");
        getPortfolio();
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setHasSearched(true);
      setSearchResult(result.data);
    }
  };

  return (
    <div className="App">
      <div className="flex flex-wrap justify-between mx-auto pt-4">
        <div className="flex flex-col flex-1 px-4 w-full">
          <Search
            onSearchSubmit={onSearchSubmit}
            search={search}
            handleSearchChange={handleSearchChange}
          />
          <CardList
            searchResults={searchResult}
            onPortfolioCreate={onPortfolioCreate}
            hasSearched={hasSearched}
          />
        </div>
        <div className="mx-4 w-full rounded-lg md:w-[300px]">
          <ListPortfolio
            portfolioValues={portfolioValues!}
            onPortfolioDelete={onPortfolioDelete}
          />
        </div>
      </div>
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
};

export default Dashboard;
