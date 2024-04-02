"use client";
import { Box } from "@mui/material";
import { useRef } from "react";
import InforImageScroll from "./InforImageScroll";
import InforImageSlider from "./InforImageSlider";
export default function InforImage({
  dataProduct,
  setActiveImage,
  activeImage,
}) {
  const containerRef = useRef(0);

  return (
    <>
      {dataProduct && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: { xs: "100%", md: "55%" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <InforImageScroll
              dataProduct={dataProduct}
              setActiveImage={setActiveImage}
              containerRef={containerRef}
              activeImage={activeImage}
            />

            <InforImageSlider
              dataProduct={dataProduct}
              setActiveImage={setActiveImage}
              containerRef={containerRef}
              activeImage={activeImage}
            />
          </Box>
        </>
      )}
    </>
  );
}
