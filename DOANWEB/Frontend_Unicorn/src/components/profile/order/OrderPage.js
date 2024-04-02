"use client";
import ListOrders from "@/components/profile/order/ListOrders";
import { ORDER_QUERY_TYPE } from "@/configs/config.orders";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: "600",
    fontSize: "1.5rem",
    marginRight: theme.spacing(1),
    color: theme.palette.common.black,

    "&.Mui-selected": {
      color: "#38ac8f",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#20262d" : "#eaebec",
      borderRadius: "20px",
    },
  })
);

const ORDER_STATUS = [
  {
    label: "Tất cả",
    value: ORDER_QUERY_TYPE.ALL,
    component: <ListOrders value={ORDER_QUERY_TYPE.ALL} />,
  },
  {
    label: "Chờ thanh toán",
    value: ORDER_QUERY_TYPE.PAYMENT_PENDING,
    component: <ListOrders value={ORDER_QUERY_TYPE.PAYMENT_PENDING} />,
  },
  {
    label: "Chờ xác nhận",
    value: ORDER_QUERY_TYPE.PENDING,
    component: <ListOrders value={ORDER_QUERY_TYPE.PENDING} />,
  },
  {
    label: "Vận chuyển",
    value: ORDER_QUERY_TYPE.DELIVERING,
    component: <ListOrders value={ORDER_QUERY_TYPE.DELIVERING} />,
  },
  {
    label: "Hoàn thành",
    value: ORDER_QUERY_TYPE.DELIVERED,
    component: <ListOrders value={ORDER_QUERY_TYPE.DELIVERED} />,
  },
  {
    label: "Đã hủy",
    value: ORDER_QUERY_TYPE.CANCELLED,
    component: <ListOrders value={ORDER_QUERY_TYPE.CANCELLED} />,
  },
];

export default function OrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeOrder = searchParams.get("type") || ORDER_QUERY_TYPE.ALL;
  const [value, setValue] = useState(typeOrder);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    router.replace("?type=" + value, {
      scroll: false,
    });
  }, [value]);

  useEffect(() => {
    setValue(typeOrder);
  }, [typeOrder]);
  return (
    <>
      <div className="user-desc-container divide-y divide-gray-200 rounded-lg shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Lịch sử đơn hàng</h2>
        </div>
        <div className="user-desc-body">
          <Box
            sx={{
              width: "100%",

              gap: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <TabContext value={value}>
              <TabList
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons={false}
                onChange={handleChange}
                sx={{
                  width: "100%",

                  borderBottom: (theme) =>
                    theme.palette.mode === "light"
                      ? "1px solid #dcdee0"
                      : "1px solid #4b4c4e",
                }}
              >
                {ORDER_STATUS.map((item, i) => {
                  return (
                    <StyledTab
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </TabList>

              {Object.keys(ORDER_QUERY_TYPE).map((item) => (
                <TabPanel
                  key={item}
                  sx={{
                    padding: 0,
                    width: "100%",
                  }}
                  value={ORDER_QUERY_TYPE[item]}
                >
                  <ListOrders value={ORDER_QUERY_TYPE[item]} />
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}
