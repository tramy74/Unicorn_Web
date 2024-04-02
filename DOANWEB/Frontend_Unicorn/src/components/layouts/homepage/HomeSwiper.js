"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const imageSliders = ["/slider1.jpg", "/slider2.jpg", "/slider3.jpg"];

export default function HomeSwiper() {
  return (
    <>
      <div className="swiper-container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 0.5,
          }}
          pagination={{ el: "swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-next-button",
            prevEl: ".swiper-prev-button",
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper-container"
        >
          {imageSliders.map((image, index) => (
            <SwiperSlide key={index} className="swiper-item">
              <Link href="#" className="slider-image-container">
                <Image
                  alt=""
                  src={image}
                  className="slider-image"
                  width={2000}
                  height={200}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-control">
          <Button className="swiper-prev-button swiper-control-button">
            <NavigateBeforeIcon fontSize="large" />
          </Button>
          <Button className="swiper-next-button swiper-control-button">
            <NavigateNextIcon fontSize="large" />
          </Button>
        </div>
      </div>
    </>
  );
}
