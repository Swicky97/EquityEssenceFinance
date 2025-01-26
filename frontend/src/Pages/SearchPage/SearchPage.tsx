import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getPortfolio();
  }, [])

  const getPortfolio = () => {
    portfolioGetAPI()
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
    portfolioAddAPI(e.target[0].value)
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
    portfolioDeleteAPI(e.target[0].value)
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
      setSearchResult(result.data);
    }
  };

  return (
    <div className="App">
      <div className="flex flex-wrap container mx-auto pt-4">
        <div className="flex flex-col flex-2 w-full pr-4 md:w-2/3">
          <Search
            onSearchSubmit={onSearchSubmit}
            search={search}
            handleSearchChange={handleSearchChange}
          />
          <CardList
            searchResults={searchResult}
            onPortfolioCreate={onPortfolioCreate}
          />
        </div>
        <div className="flex-1 w-full rounded-lg md:w-1/3">
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

export default SearchPage;
