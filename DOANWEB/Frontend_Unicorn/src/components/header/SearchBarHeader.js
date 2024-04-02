"use client";

import ROUTERS_PATH from "@/configs/config.routers.path";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function SearchBarHeader(props) {
  const { showSearchBar, setShowSearchBar } = props;
  const timeRef = useRef();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchProducts = async () => {
    try {
      const request = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/search?query=${inputValue}`
      );
      const data = request.data?.data || [];
      setDataSearch(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      // Prevent continuous call api
      timeRef.current = setTimeout(() => {
        handleSearchProducts().finally(() => {
          setIsLoading(false);
        });
      }, 500);
      return () => {
        clearTimeout(timeRef.current);
      };
    } else {
      clearTimeout(timeRef.current);
      setIsLoading(false);
      setDataSearch([]);
    }
  }, [inputValue]);

  const handleCloseSearchBar = () => {
    setShowSearchBar(false);
    setInputValue("");
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const listAutoComplete = (event) => {
    let filter = event;
    filter = filter.toLowerCase();

    return dataSearch.map((item, i) => {
      const text = item.product_name;
      const index = text.toLowerCase().indexOf(filter);
      if (index >= 0) {
        return (
          <ListItem disablePadding key={item._id}>
            <ListItemButton
              onClick={() => {
                router.push(ROUTERS_PATH.HOME_PRODUCT + "/" + item._id);
                handleCloseSearchBar();
              }}
            >
              <ListItemText>
                {text.substring(0, index)}
                <span style={{ color: "blue" }}>
                  {text.substring(index, index + filter.length)}
                </span>
                {text.substring(index + filter.length)}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        );
      }
    });
  };

  return (
    <Modal
      open={showSearchBar}
      onClose={() => handleCloseSearchBar()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box
          sx={{
            border: "none",
            outline: "none",
            backgroundColor: "white",
            height: "7rem",
            boxShadow: "2px 2px 2px #dcdbdb",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            justifyContent: "space-between",
            padding: "1rem",
            position: "fixed",
            top: "0",
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Container>
            <TextField
              autoFocus
              sx={{ width: "100%" }}
              value={inputValue}
              placeholder="Tìm kiếm..."
              onInput={(e) => handleInputChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: inputValue && (
                  <InputAdornment
                    onClick={() => setInputValue("")}
                    sx={{ cursor: "pointer" }}
                    position="end"
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Container>
        </Box>
        {inputValue ? (
          <Container
            sx={{
              maxHeight: "40rem",
              overflowY: "auto",
              border: "none",
              outline: "none",
              backgroundColor: "white",
              boxShadow: "1px 0 2px var(--Black-Color)",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "space-between",
              position: "fixed",
              top: "7rem",
              left: 0,
              right: 0,
              padding: 0,
              "&.MuiContainer-root": {
                padding: 0,
              },
              zIndex: (theme) => theme.zIndex.appBar,
            }}
          >
            <List sx={{ width: "100%", padding: 0, maxHeight: "40rem" }}>
              {isLoading && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText>Đang tải...</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </>
              )}
              {!isLoading && dataSearch.length === 0 && (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText>Không tìm thấy sản phẩm nào..</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}

              {!isLoading &&
                dataSearch.length !== 0 &&
                listAutoComplete(inputValue)}
            </List>
          </Container>
        ) : null}
      </>
    </Modal>
  );
}

export default SearchBarHeader;
