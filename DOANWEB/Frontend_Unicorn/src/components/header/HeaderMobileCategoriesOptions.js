"use client";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import HeaderMobileNavigationItem from "./HeaderMobileNavigationItem";
const TAB_VALUE = {
  MEN: "Nam",
  WOMEN: "Nữ",
  BEST_SELLER: "Best Seller",
  SALE: "Sale",
};
export default function HeaderMobileCategoriesOptions({
  setIsCategoriesOptionsVisible,
}) {
  const [value, setValue] = useState(TAB_VALUE.MEN);
  const ref = useRef(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOutside = () => {
    setIsCategoriesOptionsVisible(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const renderUITabComponent = (value) => {
    switch (value) {
      case TAB_VALUE.MEN:
        return (
          <HeaderMobileNavigationItem
            GENDER="men"
            setIsCategoriesOptionsVisible={setIsCategoriesOptionsVisible}
          />
        );
      case TAB_VALUE.WOMEN:
        return (
          <HeaderMobileNavigationItem
            GENDER="women"
            setIsCategoriesOptionsVisible={setIsCategoriesOptionsVisible}
          />
        );
      default:
        return "";
    }
  };

  return (
    <>
      <Box
        ref={ref}
        sx={{
          width: "100vw",
          backgroundColor: "#fff",

          position: "fixed",
          left: 0,
          top: "7rem",
          marginTop: "1px",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange}>
              {Object.keys(TAB_VALUE).map((item) => (
                <Tab
                  key={item}
                  label={TAB_VALUE[item]}
                  value={TAB_VALUE[item]}
                />
              ))}
            </TabList>
          </Box>
          {Object.keys(TAB_VALUE).map((item) => (
            <TabPanel key={item} className="h-[75vh]" value={TAB_VALUE[item]}>
              {renderUITabComponent(TAB_VALUE[item])}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
}
