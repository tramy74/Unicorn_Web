"use client";

import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetOverview from "@/customHooks/admin/useGetOverview";
import { Box } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function OverviewBanner() {
  const { data, isLoading } = useGetOverview();

  const LIST_BANNER = [
    {
      title: "Tổng đơn hàng",
      value: 0,
      image: "/total-order.jpg",
      key: "countOrders",
      type: "number",
    },
    {
      title: "Tổng khách hàng",
      value: 0,
      image: "/visited-customer.jpg",
      key: "countUsers",
      type: "number",
    },
    {
      title: "Doanh thu tuần",
      value: 0,
      image: "/week-sale.jpg",
      key: "sumWeeklyRevenue",
      type: "money",
    },
  ];
  return (
    <>
      <span className="income-text">Tổng quan</span>
      {isLoading && <LoadingContent />}
      {data && (
        <Box
          className="general-infomation"
          sx={{
            display: "grid",
            gap: { xs: "1rem", lg: "1.5rem" },
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0,1fr))",
              sm: "repeat(2, minmax(0,1fr))",
              md: "repeat(3, minmax(0,1fr))",
              lg: "repeat(4, minmax(0,1fr))",
            },
          }}
        >
          {LIST_BANNER.map((item) => (
            <div
              key={item.key}
              className="relative flex h-[20rem] items-end justify-center  rounded-[2rem] bg-cover bg-right-top bg-no-repeat"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute bottom-0 left-[2rem] my-[2rem] flex flex-col">
                <span className="text-[2rem] text-white">{item.title}</span>
                <span className="text-[2rem] text-white">
                  {getValue(item.type, item.key, data)}
                </span>
              </div>
            </div>
          ))}
        </Box>
      )}
    </>
  );
}

const getValue = (type = "number", key, data = []) => {
  let value = 0;
  const findDataByKey = data.find((item) => item[key]);
  if (findDataByKey) {
    value = findDataByKey[key];
  }
  if (type === "number") {
    return (
      <NumericFormat
        value={value}
        displayType="text"
        allowLeadingZeros
        thousandSeparator=","
        suffix=""
      />
    );
  } else if (type === "money") {
    return (
      <NumericFormat
        value={value}
        displayType="text"
        allowLeadingZeros
        thousandSeparator=","
        suffix=" đ "
      />
    );
  }
  return value;
};
