"use client";
import {
  ProductItem,
  ProductItemLoading,
} from "@/components/product/ProductItem";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const PRODUCTS = [];
const PAGE = 1;
const ITEMS_OF_PAGE = 5;
export default function ListSuggesting({ productId }) {
  const getListSuggesProducts = async () => {
    try {
      const results = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/products/suggesting?productId=${productId}&page=${PAGE}&itemsOfPage=${ITEMS_OF_PAGE}`
      );
      const data = results.data.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error, isLoading, isError } = useQuery(
    ["get-suggesting-products", productId],
    () => getListSuggesProducts(),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError]);
  return (
    <>
      <Box>
        <Box
          sx={{
            padding: "1.5rem 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Có lẽ bạn sẽ thích
          </Typography>
        </Box>
        <Box
          className="!m-b-[1rem]"
          sx={{
            position: "relative",
            display: "flex",
            gap: "1rem",
            overflowX: "hidden",
          }}
        >
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_item, i) => (
                <ProductItemLoading
                  sx={{
                    width: "20rem",
                    minWidth: "20rem",
                  }}
                  key={i}
                />
              ))}
            </>
          )}
          <Swiper
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0.5,
            }}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: ".recommend-button-next",
              prevEl: ".recommend-button-prev",
              clickable: true,
            }}
            pagination={{ el: "swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            style={{ padding: "0.5rem", width: "100%" }}
          >
            {data?.map((item) => (
              <SwiperSlide key={item._id} style={{}}>
                <ProductItem
                  product={item}
                  sx={{
                    margin: 0,
                    width: "100%",
                    minWidth: "20rem",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="recommend-button-prev z-10">
            {!isLoading ? (
              <NavigateBeforeIcon className="" sx={{ fontSize: 50 }} />
            ) : null}
          </div>
          <div className="recommend-button-next z-10">
            {!isLoading ? (
              <NavigateNextIcon className="" sx={{ fontSize: 50 }} />
            ) : null}
          </div>
        </Box>
      </Box>
    </>
  );
}
