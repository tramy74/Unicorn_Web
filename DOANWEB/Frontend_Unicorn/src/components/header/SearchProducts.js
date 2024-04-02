"use client";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarHeader from "./SearchBarHeader";

import { useState } from "react";

const SearchProducts = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = () => setShowSearchBar(true);

  return (
    <>
      <SearchIcon
        sx={{
          fontSize: "2.5rem",
          cursor: "pointer",
        }}
        onClick={() => handleShowSearchBar()}
      />
      <SearchBarHeader
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
    </>
  );
};
export default SearchProducts;
