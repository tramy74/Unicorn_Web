"use client";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const TIME_REPEAT = 3000;

export default function NewShoesProduct() {
  const imageSliders = ["/Nike1.png", "/Nike2.png", "/Nike3.png"];
  const [activeImage, setActiveImage] = useState(imageSliders[1]);
  const [isRunningTransition, setIsRunningTransition] = useState(false);
  const timerRef = useRef(null);

  const calculatePosition = (index) => {
    const centerIndex = imageSliders.indexOf(activeImage);
    const offset = index - centerIndex;
    const left = offset === 0 ? 200 : 0;
    const rotateObject = centerIndex === 0 ? 360 : 0;
    const scaleObject = index === centerIndex ? 5 : 1;
    const top = offset === 0 ? 120 : offset === 1 || offset === -2 ? 357 : 0;
    return { x: left, y: top, scale: scaleObject, rotate: rotateObject };
  };

  useEffect(() => {
    // Auto running
    timerRef.current = setInterval(() => {
      const getCurrentIndexActiveImage = imageSliders.indexOf(activeImage);
      if (getCurrentIndexActiveImage === imageSliders.length - 1) {
        setActiveImage(imageSliders[0]);
      } else {
        setActiveImage(imageSliders[getCurrentIndexActiveImage + 1]);
      }
    }, TIME_REPEAT);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [activeImage]);

  const handleChangeActiveImage = (image) => {
    if (isRunningTransition) {
      return;
    }
    setActiveImage(image);
  };

  return (
    <>
      <Container
        className="rounded-lg"
        sx={{
          display: { xs: "none", md: "block" },
          height: "50rem",
          marginTop: "5%",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "relative",
            background: "url(/template.jpg) no-repeat top center/ contain",
            boxShadow:
              "-3px 3px 11px 1px rgb(248 248 248 / 0%), 9px 8px 8px 1px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Stack
            direction="row"
            sx={{
              top: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              padding: "3.5rem 0",
              alignItems: "center",
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {imageSliders.map((item, index) => {
                const { x, y, scale, rotate } = calculatePosition(index);
                return (
                  <motion.div
                    key={index}
                    animate={{ x, y, scale, rotate }}
                    transition={{
                      type: "spring",
                      duration: 1.5,
                    }}
                    onAnimationStart={() => setIsRunningTransition(true)}
                    onAnimationComplete={() => setIsRunningTransition(false)}
                    className={item === activeImage ? "nike active" : "nike"}
                    onClick={() => handleChangeActiveImage(item)}
                  >
                    <img
                      src={item}
                      key={index}
                      className="drop-shadow-md"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </motion.div>
                );
              })}
            </Box>
            <Stack
              spacing={5}
              sx={{
                width: "100%",
                minWidth: "50rem",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontWeight: "700", fontSize: "4rem" }}
              >
                SẢN PHẨM MỚI
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "2rem",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    content: '""',
                    height: ".5rem",
                    width: "10rem",
                    position: "absolute",
                    background: "#a5e8d7",
                    top: "100%",
                    left: {
                      0: "15%",
                      1: "50%",
                      2: "84%",
                    }[imageSliders.indexOf(activeImage)],
                    zIndex: 0,
                    transition: "all .3s",
                    transform: "translateX(-40%)",
                  }}
                ></Box>
                {imageSliders.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "20rem",
                      borderRadius: "100%",
                      zIndex: 2,
                      transition: ".5s",
                      cursor: "pointer",
                    }}
                    className={item === activeImage ? "active" : ""}
                    onClick={() => handleChangeActiveImage(item)}
                  >
                    <img
                      src={item}
                      key={index}
                      className="drop-shadow-lg"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        transform: "rotate(15deg)",
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                sx={{
                  width: "30%",

                  color: "#f9f9f9",
                  backgroundColor: "#000",
                  border: ".1rem solid #000",
                  borderRadius: "2.5rem",
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                Xem thêm
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
