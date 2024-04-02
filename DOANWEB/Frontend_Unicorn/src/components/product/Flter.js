"use client";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const GENDER = "men";

const filterPrice = [
  "Nhỏ hơn 100.000đ",
  "100.000đ - 200.000đ",
  "200.000đ - 300.000đ",
  "300.000đ - 400.000đ",
  "400.000đ - 700.000đ",
  "Trên 700.000 đ",
];

export default function Filter({ filterData, category, color, size }) {
  const [categories, colors, sizes] = filterData;
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchColor = params.get("color");
  const searchSize = params.get("size");
  const searchGender = params.get("gender");
  const searchCategory = params.get("category");

  const [open, setOpen] = useState({});

  useEffect(() => {
    setOpen({});
  }, [searchGender]);
  useEffect(() => {
    if (category) {
      const findParentCategory = categories.find((item) => {
        if (item._id === category) {
          return true;
        }
        const findChildCategory = item.child_categories.find(
          (child) => child._id === category
        );
        if (findChildCategory) {
          return true;
        }
        return false;
      });
      if (findParentCategory) {
        setOpen((prevOpen) => ({
          ...prevOpen,
          [findParentCategory._id]: true,
        }));
      } else {
        setOpen((prevOpen) => ({
          ...prevOpen,
          [findParentCategory._id]: false,
        }));
      }
    }
  }, [category]);
  useEffect(() => {
    if (color) {
      setOpen((prevOpen) => ({
        ...prevOpen,
        ["colors"]: true,
      }));
    }
  }, [color]);
  useEffect(() => {
    if (size) {
      setOpen((prevOpen) => ({
        ...prevOpen,
        ["sizes"]: true,
      }));
    }
  }, [size]);

  useEffect(() => {
    console.log({ open });
  }, [open]);

  const handleToggle = (categoryId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId],
    }));
  };
  const handleClickFilter = ({ type, value }) => {
    const newParams = new URLSearchParams(params.toString());
    if (type === "color") {
      newParams.set("color", value);
    } else if (type === "size") {
      newParams.set("size", value);
    } else if (type === "category") {
      newParams.set("category", value);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Box
      className="filter-container sticky top-[7rem]"
      sx={{
        width: { xs: "100%", md: "25rem" },
      }}
    >
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          Bộ lọc
        </ListSubheader>
        <SimpleBar style={{ height: "calc(100vh - 7rem)" }}>
          {categories?.map((category) => (
            <div key={category._id}>
              <ListItemButton
                onClick={() => {
                  handleToggle(category._id);
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ListItemText
                  primary={
                    <Typography className="!font-medium">
                      {category.product_category_name}
                    </Typography>
                  }
                />
                {open[category._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
              <Collapse in={open[category._id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() =>
                      handleClickFilter({
                        type: "category",
                        value: category._id,
                      })
                    }
                  >
                    <ListItemText
                      sx={{
                        color:
                          searchCategory === category._id
                            ? (theme) => theme.palette.primary.main
                            : null,
                      }}
                      primary={"Tất cả " + category.product_category_name}
                    />
                  </ListItemButton>
                  {category.child_categories.map((child_category) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={child_category._id}
                      onClick={() =>
                        handleClickFilter({
                          type: "category",
                          value: child_category._id,
                        })
                      }
                    >
                      <ListItemText
                        sx={{
                          color:
                            searchCategory === child_category._id
                              ? (theme) => theme.palette.primary.main
                              : null,
                        }}
                        primary={child_category.product_category_name}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
          <hr />
          <ListItemButton
            onClick={() => handleToggle("colors")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ListItemText
              primary={
                <Typography className="!font-medium">Màu sắc</Typography>
              }
            />
            {open["colors"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={open["colors"]} timeout="auto" unmountOnExit>
            <div className="colors-filler-container">
              <Stack
                sx={{
                  border: "2px solid",
                  borderColor:
                    searchColor === "all"
                      ? (theme) => theme.palette.primary.main
                      : "transparent",
                }}
                direction="row"
                spacing={1}
                className="color-selection"
                onClick={() =>
                  handleClickFilter({
                    type: "color",
                    value: "all",
                  })
                }
              >
                <div
                  className="color-point"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, red, yellow)",
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                  }}
                ></div>
                <span>Tất cả</span>
              </Stack>

              {colors?.map((color) => (
                <Stack
                  key={color._id}
                  sx={{
                    border: "2px solid",
                    borderColor:
                      searchColor === color._id
                        ? (theme) => theme.palette.primary.main
                        : "transparent",
                  }}
                  direction="row"
                  spacing={1}
                  className="color-selection"
                  onClick={() =>
                    handleClickFilter({
                      type: "color",
                      value: color._id,
                    })
                  }
                >
                  <div
                    className="color-point"
                    style={{
                      background: color.product_color_code,
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>{color.product_color_name}</span>
                </Stack>
              ))}
            </div>
          </Collapse>
          <ListItemButton
            onClick={() => handleToggle("sizes")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ListItemText
              primary={
                <Typography className="!font-medium">Kích thước</Typography>
              }
            />
            {open["sizes"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={open["sizes"]} timeout="auto" unmountOnExit>
            <div className="sizes-filter-container">
              <Box
                className="size-item"
                sx={{
                  border: "2px solid",
                  borderColor:
                    searchSize === "all"
                      ? (theme) => theme.palette.primary.main
                      : "transparent",
                }}
                onClick={() =>
                  handleClickFilter({
                    type: "size",
                    value: "all",
                  })
                }
              >
                Tất cả
              </Box>

              {sizes?.map((size) => (
                <Box
                  key={size.product_size_name}
                  className="size-item"
                  sx={{
                    border: "2px solid",
                    borderColor:
                      searchSize === size._id
                        ? (theme) => theme.palette.primary.main
                        : "transparent",
                  }}
                  onClick={() =>
                    handleClickFilter({
                      type: "size",
                      value: size._id,
                    })
                  }
                >
                  {size.product_size_name}
                </Box>
              ))}
            </div>
          </Collapse>
          {/* <ListItemButton
          onClick={() => handleToggle("price")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ListItemText primary="Giá" />
          {open["price"] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={open["price"]} timeout="auto" unmountOnExit>
          <FormGroup sx={{ paddingLeft: 1 }}>
            {filterPrice.map((price, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={price}
              />
            ))}
          </FormGroup>
        </Collapse> */}
        </SimpleBar>
      </List>
    </Box>
  );
}
