import React, { createContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Appbar from "../components/layout/appbar/appbar";

/**
 * The SearchContext provides a way to share search data between components.
 * @type {React.Context<Object>}
 */
export const SearchContext = createContext();

/**
 * Renders the child components if the user is authenticated, otherwise it redirects to the login page.
 */
const PrivateRoute = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [searchData, setSearchData] = useState("");

  return (
    <>
      {authenticated ? (
        <>
          <SearchContext.Provider value={{ searchData, setSearchData }}>
            <Appbar />
            <Outlet />
          </SearchContext.Provider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
