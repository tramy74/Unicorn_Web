"use client";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function InforImageSlider({
  dataProduct,
  setActiveImage,
  activeImage,
  containerRef,
}) {
  const theme = useTheme();

  const [imageSliders, setImageSliders] = useState(
    dataProduct?.product_images || []
  );

  const [isGoPrev, setIsGoPrev] = useState(false);
  const [isGoNext, setIsGoNext] = useState(false);
  const [isCount, setCount] = useState(0);
  // 73 = sizeImage(4remx4rem) + gap(1rem) + padding(1rem) + border(2px)
  const sizeOfImage = 73.2;
  const imageLoader = ({ src, width, quality }) => {
    const url = new URL(src);
    url.searchParams.set("width", width.toString());
    return url.href;
  };

  // Min width screen: sm (600px); if the device screen >= 600, matched
  const matchesBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (activeImage) {
      const findIndexActiveImage = imageSliders.indexOf(activeImage);
      setCount(findIndexActiveImage);
      setDisplayNavigationButton(findIndexActiveImage);
    }
  }, [activeImage]);
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

  const setDisplayNavigationButton = (index) => {
    if (index <= 0) {
      setIsGoPrev(true);
      setIsGoNext(false);
    } else if (index === imageSliders.length - 1) {
      setIsGoNext(true);
      setIsGoPrev(false);
    } else {
      setIsGoNext(false);
      setIsGoPrev(false);
    }
  };
  const goPrev = () => {
    const index = isCount - 1;
    setActiveImage(imageSliders[index]);
    // Reponsive
    if (matchesBreakpoint) {
      scrollUpSlider();
    } else {
      scrollLeftSlider();
    }
  };

  const goNext = () => {
    const index = isCount + 1;
    setActiveImage(imageSliders[index]);
    // Reponsive
    if (matchesBreakpoint) {
      scrollDownSlider();
    } else {
      scrollRightSlider();
    }
  };

  return (
    <>
      <Box
        className="slider"
        sx={{
          maxWidth: { xs: "100%", md: "50rem" },
          flex: { sm: 1 },
          minHeight: "50rem",
          width: "100%",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {imageSliders.map((item, i) => (
          <Image
            key={i}
            src={item}
            loader={(props) => imageLoader({ ...props, width: 750 })}
            alt={dataProduct.product_name}
            fill
            sizes="1000"
            style={{
              position: "absolute",
              maxWidth: "100%",
              height: "100%",
              objectFit: "contain",
              left: `${i * 100}%`,
              transition: "1s",
              transform: `translateX(-${isCount * 100}%)`,
            }}
          />
        ))}

        <Button
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            minWidth: "1rem",
            minHeight: "1rem",
            maxWidth: " 3.5rem",
            maxHeight: "3.5rem",
            lineHeight: 0,
            border: ".1rem solid #ccc",
            backgroundColor: "#fdfdfd",
            color: "#767676",
            opacity: 0.9,
            "&:hover": {
              backgroundColor: "#767676",
              color: "#fdfdfd",
            },
          }}
          disabled={isGoPrev}
          onClick={() => goPrev()}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <Button
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            minWidth: "1rem",
            minHeight: "1rem",
            maxWidth: " 3.5rem",
            maxHeight: "3.5rem",
            lineHeight: 0,
            border: ".1rem solid #ccc",
            backgroundColor: "#fdfdfd",
            color: "#767676",
            opacity: 0.9,
            "&:hover": {
              backgroundColor: "#767676",
              color: "#fdfdfd",
            },
          }}
          disabled={isGoNext}
          onClick={() => goNext()}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </>
  );
}
