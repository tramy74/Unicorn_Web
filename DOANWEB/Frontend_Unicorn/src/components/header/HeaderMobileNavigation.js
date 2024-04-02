"use client";
import { Transition } from "@headlessui/react";
import ReorderIcon from "@mui/icons-material/Reorder";
import SortIcon from "@mui/icons-material/Sort";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import HeaderMobileCategoriesOptions from "./HeaderMobileCategoriesOptions";

const BREAKPOINTS_MOBILE = 900;
export default function HeaderMobileNavigation() {
  const [isCategoriesOptionsVisible, setIsCategoriesOptionsVisible] =
    useState(false);

  const toggleCategoriesOptions = () => {
    setIsCategoriesOptionsVisible(!isCategoriesOptionsVisible);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= BREAKPOINTS_MOBILE) {
        setIsCategoriesOptionsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Stack>
          {isCategoriesOptionsVisible ? (
            <SortIcon
              sx={{
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
              onClick={toggleCategoriesOptions}
            />
          ) : (
            <ReorderIcon
              sx={{
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
              onClick={toggleCategoriesOptions}
            />
          )}
        </Stack>
        <Transition
          show={isCategoriesOptionsVisible}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeaderMobileCategoriesOptions
            setIsCategoriesOptionsVisible={setIsCategoriesOptionsVisible}
          />
        </Transition>
      </Box>
    </>
  );
}
