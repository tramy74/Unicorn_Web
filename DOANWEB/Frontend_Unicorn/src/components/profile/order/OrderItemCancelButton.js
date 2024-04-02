import Modal, { ModalBody, ModalTitle } from "@/components/generals/Modal";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

const OrderItemCancelButton = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const handleCancelOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/orders/cancel`,
        {
          orderId: item._id,
        }
      );

      queryClient.invalidateQueries(["get-list-orders-user", "all"]);
      queryClient.invalidateQueries([
        "get-list-orders-user",
        item.order_status,
      ]);

      toast.success(res.data.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
      throw err;
    }
  };

  const { mutate: cancelOrder, isLoading } = useMutation({
    mutationFn: () => {
      return handleCancelOrder();
    },
    onMutate: () => {
      dispatch(setIsLoading(true));
      const previousAllData = queryClient.getQueryData([
        "get-list-orders-user",
        "all",
      ]);
      const previousData = queryClient.getQueryData([
        "get-list-orders-user",
        item.order_status,
      ]);
      console.log({ previousAllData, previousData });
      return { previousAllData, previousData };
    },
    onSuccess: () => {
      setIsOpenModal(false);
    },
    onError: (err, _, context) => {
      const { previousData, previousAllData } = context;
      queryClient.setQueryData(
        ["get-list-orders-user", "all"],
        previousAllData
      );
      queryClient.setQueryData(
        ["get-list-orders-user", item.order_status],
        previousData
      );
    },
    onSettled: () => {
      dispatch(setIsLoading(false));
    },
  });

  return (
    <>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <ModalTitle>Xác nhận hủy đơn hàng</ModalTitle>
        <ModalBody>
          <div className="p-2">Xác nhận hủy đơn {item._id}?</div>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsOpenModal(false)}
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "2px solid #ccc",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: "0.7",
                },
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={cancelOrder}
              sx={{
                backgroundColor: "#E74040E5",
                "&:hover": {
                  backgroundColor: "#E74040E5",
                  opacity: "0.7",
                },
              }}
            >
              Xác nhận
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Button onClick={() => setIsOpenModal(true)}>Hủy đơn</Button>
    </>
  );
};
export default OrderItemCancelButton;
