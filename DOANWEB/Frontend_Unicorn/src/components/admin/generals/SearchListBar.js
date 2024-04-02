"use client";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputBase, Stack } from "@mui/material";

const SearchListBar = ({ value, onChange }) => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          border: "1px solid #ccc",
          width: "100%",
          padding: "1rem",
          borderRadius: "4px",
          alignItems: "center",

          margin: "2rem 0",
        }}
      >
        <SearchOutlinedIcon />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={onChange}
          value={value}
          placeholder="Tìm kiếm"
        />
      </Stack>
    </>
  );
};
export default SearchListBar;
