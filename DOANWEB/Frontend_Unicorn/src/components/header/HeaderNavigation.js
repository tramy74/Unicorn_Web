"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import HeaderNavigationItem from "./HeaderNavigationItem";

export default function HeaderNavigation() {
  const [positionOfElement, setPositionOfElement] = useState(0);
  const [valueMen, setValueMen] = useState({
    padding: '0rem',
    paddingLeft: 0,
    scale: 0,
    opacity: 0
  })
  const [valueWomen, setValueWomen] = useState({
    padding: '0rem',
    paddingLeft: 0,
    scale: 0,
    opacity: 0
  })
  const router = useRouter();
  const boxMen = useRef(null);
  const boxWomen = useRef(null);

  const handleMenMouseEnter = () => {
    const boxElement = boxMen.current;
    if (boxElement) {
      const rect = boxElement.getBoundingClientRect();
      const { x, width } = rect;
      setPositionOfElement(Math.round(x + width * 2 / 3) / 10);
    }
    setValueMen({
      padding: '2rem 6rem',
      paddingLeft: 5,
      scale: 1,
      opacity: 1
    })
  };

  const handleMenMouseLeave = () => {
    setValueMen({
      padding: '0rem',
      paddingLeft: 0,
      scale: 0,
      opacity: 0
    })
  };

  const handleWomenMouseEnter = () => {
    const boxElement = boxWomen.current;
    if (boxElement) {
      const rect = boxElement.getBoundingClientRect();
      const { x, width } = rect;
      setPositionOfElement(Math.round(x + width * 2 / 3) / 10);
    }
    setValueWomen({
      padding: '2rem 6rem',
      paddingLeft: 5,
      scale: 1,
      opacity: 1
    })
  };

  const handleWomenMouseLeave = () => {
    setValueWomen({
      padding: '0rem',
      paddingLeft: 0,
      scale: 0,
      opacity: 0
    })
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          textTransform: "uppercase",
          fontSize: "1.8rem",
          marginTop: "0.5rem",
          gap: "2rem",
          flex: 1,
        }}
      >
        <Box
          ref={boxMen}
          sx={{
            paddingLeft: "2rem",
            cursor: "pointer",
          }}
          onMouseEnter={handleMenMouseEnter}
          onMouseLeave={handleMenMouseLeave}
        >
          <Stack>
            <span
              onClick={() => {
                router.push(`${ROUTERS_PATH.HOME_PRODUCT}?gender=men`);
              }}
              className="category-gender-button"
            >
              Nam
            </span>

            <div className="header-men-categories">
              {<HeaderNavigationItem GENDER="men" positionOfElement={positionOfElement} value={valueMen} />}
            </div>
          </Stack>
        </Box>
        <Box
          ref={boxWomen}
          sx={{
            paddingLeft: "3rem",
            cursor: "pointer",
          }}
          onMouseEnter={handleWomenMouseEnter}
          onMouseLeave={handleWomenMouseLeave}
        >
          <span
            onClick={() => {
              router.push(`${ROUTERS_PATH.HOME_PRODUCT}?gender=women`);
            }}
            className="category-gender-button"
          >
            Nữ
          </span>

          <div className="header-women-categories">
            {<HeaderNavigationItem GENDER="women" positionOfElement={positionOfElement} value={valueWomen} />}
          </div>
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            color: "primary.main",
          }}
        >
          Best Seller
        </Box>
        <Box
          sx={{
            paddingLeft: "3rem",
            color: "primary.main",
          }}
        >
          Sale
        </Box>
      </Box>
    </>
  );
}
