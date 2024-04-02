"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import useGetProductCategories from "@/customHooks/useGetProductCategories";
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeaderNavigationItem = ({ GENDER, positionOfElement, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };
  const { data, isLoading, isError } = useGetProductCategories({
    gender: GENDER,
  });

  if (isLoading)
    return (
      <div
        className="header-navigation-container"
        style={{
          transformOrigin: `${positionOfElement}rem top`,
          transition: `opacity ease-in-out .25s, scale ease-in-out .25s, padding ease-in-out .25s`,
          willChange: "opacity, transform, padding, scale",
          scale: `${value.scale}`,
          opacity: `${value.opacity}`,
          padding: `${value.padding}`,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            maxWidth: "100vw",
            paddingLeft: `${value.paddingLeft}`,
            textAlign: "center",
            position: "relative",
            height: "70vh",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <CircularProgress color="inherit" className="loading-progress" />
        </Box>
      </div>
    );

  return (
    <div
      className="header-navigation-container"
      style={{
        transformOrigin: `${positionOfElement}rem top`,
        transition: `opacity ease-in-out .25s, scale ease-in-out .25s, padding ease-in-out .25s`,
        willChange: "opacity, transform, padding, scale",
        scale: `${value.scale}`,
        opacity: `${value.opacity}`,
        padding: `${value.padding}`,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "70vh",
          maxWidth: "100vw",
          overflowY: "auto",
          paddingLeft: `${value.paddingLeft}`,
        }}
        onMouseLeave={handleMouseLeave}
      >
        <Grid container spacing={1}>
          {data?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <List>
                <span
                  className="category-name"
                  onClick={() => {
                    router.push(
                      `${ROUTERS_PATH.HOME_PRODUCT}?gender=${GENDER}&category=${category._id}`
                    );
                  }}
                >
                  {category.product_category_name}
                </span>

                {category.child_categories?.map((child_categories) => (
                  <ListItemButton
                    sx={{
                      "&:hover > .child-category-name": {
                        color: "#38ac8f",
                      },
                    }}
                    key={child_categories._id}
                    onClick={() => {
                      router.push(
                        `${ROUTERS_PATH.HOME_PRODUCT}?gender=${GENDER}&category=${child_categories._id}`
                      );
                    }}
                  >
                    <ListItemText
                      primary={child_categories.product_category_name}
                      sx={{
                        textTransform: "none",
                        width: "100%",
                      }}
                      className="child-category-name"
                    />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
export default HeaderNavigationItem;
