import React, { useContext, useCallback } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { SearchContext } from "../../../../routes/privateRoute"

// Styles for the search container
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
// Styles for the search icon wrapper
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
// Styles for the input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 6),
    width: "100%",
  },
}));

/**
 * Renders a search field with a search icon.
 */
const SearchField = () => {
  const searchContext = useContext(SearchContext);

  /**
   * Handles the search input changes.
   */
  const handleSearch = useCallback((event) => {
    setTimeout(() => {
      searchContext.setSearchData(event.target.value);
    }, 500)
  }, [searchContext]);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar..."
          onChange={handleSearch}
        />
      </Search>
    </>
  );
};

export default SearchField;
