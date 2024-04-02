"use client";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InforImageScrollButton from "./InforImageScrollButton";
export default function InforImageScroll({
  dataProduct,
  setActiveImage,
  containerRef,
  activeImage,
}) {
  const parentRef = useRef();
  const [imageSliders, setImageSliders] = useState(
    dataProduct?.product_images || []
  );
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollLeft, setIsScrollLeft] = useState(false);
  const [isScrollRight, setIsScrollRight] = useState(false);
  // 73 = sizeImage(4remx4rem) + gap(1rem) + padding(1rem) + border(2px)
  const sizeOfImage = 73.2;

  useEffect(() => {
    const handleScroll = () => {
      checkValueScroll();
    };
    containerRef.current.addEventListener("scroll", handleScroll);
    return () => {
      containerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const checkValueScroll = () => {
    const sliderScrollHeight =
      containerRef.current.scrollHeight - containerRef.current.clientHeight;
    const currentScrollTop = containerRef.current.scrollTop;
    const sliderScrollWidth =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const currentScrollLeft = containerRef.current.scrollLeft;

    if (currentScrollTop <= 0) {
      setIsScrollUp(true);
      setIsScrollDown(false);
    } else if (
      Math.ceil(currentScrollTop) >=
      sliderScrollHeight - sizeOfImage / 2
    ) {
      setIsScrollUp(false);
      setIsScrollDown(true);
    } else {
      setIsScrollUp(false);
      setIsScrollDown(false);
    }
    if (currentScrollLeft <= 0) {
      setIsScrollLeft(true);
      setIsScrollRight(false);
    } else if (
      Math.ceil(currentScrollLeft) >=
      sliderScrollWidth - sizeOfImage / 2
    ) {
      setIsScrollLeft(false);
      setIsScrollRight(true);
    } else {
      setIsScrollLeft(false);
      setIsScrollRight(false);
    }
  };

  const handleChangeActiveImage = (item, index) => {
    setActiveImage(item);
    checkValueScroll(containerRef.current.scrollTop);
  };

  return (
    <>
      <Stack
        ref={parentRef}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "row", sm: "column" },
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            padding: "0 1rem",
            maxHeight: { sm: "36rem" },
            height: { sm: "36rem" },
            overflowY: "auto",
            "- ms - overflow - style": "none",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            borderBottom: ".2rem solid #ededed",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexDirection: { xs: "row", sm: "column" },
            }}
          >
            {imageSliders.map((item, i) => (
              <Box
                sx={{
                  padding: "1rem",
                  border: "2px solid",
                  borderColor: "transparent",
                  "&.active": {
                    borderColor: "#7A7272",
                  },
                }}
                className={activeImage === item ? "active" : null}
                key={i}
              >
                <Box
                  onClick={() => handleChangeActiveImage(item, i)}
                  sx={{
                    width: "4rem",
                    height: "4rem",
                    position: "relative",
                    cursor: "pointer",
                    padding: "1rem",
                  }}
                >
                  <Image
                    alt={dataProduct.product_name}
                    src={item}
                    fill
                    sizes="500"
                    style={{
                      position: "absolute",
                      width: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      transition: "1s",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <InforImageScrollButton
          containerRef={containerRef}
          isScrollUp={isScrollUp}
          isScrollDown={isScrollDown}
          isScrollLeft={isScrollLeft}
          isScrollRight={isScrollRight}
          sizeOfImage={sizeOfImage}
        />
      </Stack>
    </>
  );
}
