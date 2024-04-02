"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function InforImageScrollButton({
  containerRef,
  isScrollDown,
  isScrollLeft,
  isScrollRight,
  isScrollUp,
  sizeOfImage,
}) {
  const theme = useTheme();
  // Min width screen: sm (600px); if the device screen >= 600, matched
  const matchesBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));

  const scrollUpSlider = () => {
    const newScrollTop = containerRef.current.scrollTop - sizeOfImage;
    containerRef.current.scrollTop = newScrollTop;
  };

  const scrollDownSlider = () => {
    const newScrollTop = containerRef.current.scrollTop + sizeOfImage;
    containerRef.current.scrollTop = newScrollTop;
  };

  const scrollLeftSlider = () => {
    const newScrollLeft = containerRef.current.scrollLeft - sizeOfImage;
    containerRef.current.scrollLeft = newScrollLeft;
  };
  const scrollRightSlider = () => {
    const newScrollLeft = containerRef.current.scrollLeft + sizeOfImage;
    containerRef.current.scrollLeft = newScrollLeft;
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "8rem",
          maxWidth: "70%",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
        }}
      >
        {matchesBreakpoint && (
          <>
            <Button
              sx={{
                minWidth: " .5rem",
                lineHeight: "1.5rem",
                backgroundColor: "#fdfdfd",
                color: "#767676",
                opacity: 0.9,
                "&:hover": {
                  backgroundColor: "#767676",
                  color: "#fdfdfd",
                },
              }}
              disabled={isScrollUp}
              onClick={() => scrollUpSlider()}
            >
              <KeyboardArrowUpIcon />
            </Button>
            <Button
              sx={{
                minWidth: " .5rem",
                lineHeight: "1.5rem",
                backgroundColor: "#fdfdfd",
                color: "#767676",
                opacity: 0.9,
                "&:hover": {
                  backgroundColor: "#767676",
                  color: "#fdfdfd",
                },
              }}
              disabled={isScrollDown}
              onClick={() => scrollDownSlider()}
            >
              <KeyboardArrowDownIcon />
            </Button>
          </>
        )}
        {!matchesBreakpoint && (
          <>
            <Button
              sx={{
                minWidth: " .5rem",
                lineHeight: "1.5rem",
                backgroundColor: "#fdfdfd",
                color: "#767676",
                opacity: 0.9,
                "&:hover": {
                  backgroundColor: "#767676",
                  color: "#fdfdfd",
                },
              }}
              disabled={isScrollLeft}
              onClick={() => scrollLeftSlider()}
            >
              <KeyboardArrowLeftIcon />
            </Button>
            <Button
              sx={{
                minWidth: " .5rem",
                lineHeight: "1.5rem",
                backgroundColor: "#fdfdfd",
                color: "#767676",
                opacity: 0.9,
                "&:hover": {
                  backgroundColor: "#767676",
                  color: "#fdfdfd",
                },
              }}
              disabled={isScrollRight}
              onClick={() => scrollRightSlider()}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
