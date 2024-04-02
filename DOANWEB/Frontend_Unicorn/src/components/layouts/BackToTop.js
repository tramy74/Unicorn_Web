"use client";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";

const BackToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };
  const ArrowButton = styled(KeyboardArrowUpIcon)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#ffffff",

    fontSize: "4rem",
    fontWeight: "bold",

    path: {
      fill: theme.palette.mode === "light" ? "#87d4c1" : "#0e1217",
    },
  }));
  const ArrowButtonParent = styled(Fab)({
    position: "fixed",

    overflow: "hidden",
    bottom: "0",
    right: "0",
    width: 40,
    height: 40,
    borderRadius: "5px",

    "&:hover": {
      opacity: 0.96,
    },
  });
  return (
    <>
      <Zoom in={trigger}>
        <ArrowButtonParent
          sx={{
            margin: { xs: "80px 10px", md: "20px" },
          }}
          onClick={scrollToTop}
        >
          <ArrowButton />
        </ArrowButtonParent>
      </Zoom>
    </>
  );
};
export default BackToTop;
