"use client";
import { ORDER_DELIVERY_STATUSES } from "@/configs/config.orders";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { convertOrderDeliveryStatus } from "@/utils/convertOrders";
import { Button, Radio } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

function PaymentStatusEdit({ orderStatus, orderId }) {
  const [selectOrderStatus, setSelectOrderStatus] = useState(orderStatus);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const handleChangeOrderStatus = (value) => {
    setSelectOrderStatus(value);
  };
  const ORDER_STATUSES = Object.entries(ORDER_DELIVERY_STATUSES).map(
    ([key, value]) => {
      const orderStatus = {
        title: convertOrderDeliveryStatus(value),
        value: value,
      };
      return orderStatus;
    }
  );
  const handleEditOrderStatus = async () => {
    try {
      dispatch(setIsLoading(true));
      const updateOrder = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/orders/update`,
        {
          orderId,
          orderStatus: selectOrderStatus,
        }
      );

      // refetch list admin order
      await queryClient.invalidateQueries({
        queryKey: ["admin-order-information", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-list-orders", "admin"],
        refetchInactive: true,
      });

      toast.success(updateOrder.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(err.response.data.message);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  return (
    <>
      <div>
        <h2 className="p-8 text-[2.5rem] font-bold">Tình trạng đơn hàng</h2>
        <div className="px-8 ">
          <div
            className="flex flex-col overflow-hidden "
            style={{
              width: "100%",
              border: ".1rem solid rgba(0, 0, 0, .125)",
              borderRadius: "1rem",
            }}
          >
            {ORDER_STATUSES.map((item) => (
              <div
                className="flex cursor-pointer items-center justify-between px-8 py-4 transition-all duration-150 ease-in hover:bg-[#eeeeee]"
                style={{
                  borderTop: ".1rem solid rgba(0, 0, 0, .125)",
                }}
                key={item.value}
                onClick={() => handleChangeOrderStatus(item.value)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[1.7rem] font-medium">
                    {item.title}
                  </span>
                </div>
                <Radio
                  checked={selectOrderStatus === item.value}
                  onChange={(e) => handleChangeOrderStatus(e.target.value)}
                  value={item.value}
                  name="radio-buttons"
                  inputProps={{ "aria-label": item.value }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 text-center">
          <Button
            onClick={handleEditOrderStatus}
            className="drop-shadow-xl"
            sx={{
              opacity: orderStatus === selectOrderStatus ? 0.7 : 1,
              pointerEvents:
                orderStatus === selectOrderStatus ? "none" : "default",
              padding: "1.5rem",
              borderRadius: "1rem",
              fontSize: "2rem",
            }}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>
    </>
  );
}

export default PaymentStatusEdit;
