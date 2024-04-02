"use client";
import AllImageReviewsProducts from "@/components/product/AllImageReviewsProduct";
import AllReviewsProducts from "@/components/product/AllReviewsProduct";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "2rem 0" }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const REVIEW_TARGET = [
  { id: "all", name: "Tất cả" },
  { id: "1", name: "1 sao" },
  { id: "2", name: "2 sao" },
  { id: "3", name: "3 sao" },
  { id: "4", name: "4 sao" },
  { id: "5", name: "5 sao" },
];

export default function Review({ productId, countReviews }) {
  const [value, setValue] = useState(0);

  const [filter, setFilter] = useState({
    sort: "desc",
    rating: REVIEW_TARGET[0].id,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div
        className="product-rating-list"
        style={{
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="rate-heading"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={`Tất cả đánh giá (${countReviews})`}
                {...a11yProps(0)}
              />
              <Tab label="Hình ảnh" {...a11yProps(1)} />
            </Tabs>
            <div className="rating mb-6 items-center">
              Xếp hạng
              <Listbox
                value={filter.rating}
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    rating: value,
                  }));
                }}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-[15rem] cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm md:text-base">
                    <Typography className="block truncate">
                      {REVIEW_TARGET.find((e) => e.id === filter.rating)
                        ?.name || ""}
                    </Typography>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {REVIEW_TARGET.map((target) => (
                        <Listbox.Option
                          key={target.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? "text-[#38Ac8F]" : "text-gray-900"
                            }`
                          }
                          value={target.id}
                        >
                          {({ selected }) => (
                            <>
                              <Typography
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {target.name}
                              </Typography>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#38Ac8F] ">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0} className="rating-body">
            <AllReviewsProducts productId={productId} filter={filter} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllImageReviewsProducts productId={productId} filter={filter} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
