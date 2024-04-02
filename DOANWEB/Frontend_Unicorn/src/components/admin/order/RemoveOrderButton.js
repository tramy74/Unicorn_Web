import Modal, { ModalBody, ModalTitle } from "@/components/generals/Modal";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

const RemoveOrderButton = ({ order }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const handleDeleteOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/orders/delete`,
        {
          orderId: order._id,
        }
      );

      await queryClient.invalidateQueries({
        queryKey: ["get-list-orders", "admin"],
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
      throw err;
    }
  };

  const { mutate: deleteOrder, isLoading } = useMutation({
    mutationFn: () => {
      return handleDeleteOrder();
    },
    onMutate: () => {
      dispatch(setIsLoading(true));
      const previousData = queryClient.getQueryData([
        "get-list-orders",
        "admin",
      ]);
      return { previousData };
    },
    onSuccess: () => {
      setIsOpenModal(false);
    },
    onError: (err, _, context) => {
      const { previousData } = context;
      queryClient.setQueryData(["get-list-orders", "admin"], previousData);
    },
    onSettled: () => {
      dispatch(setIsLoading(false));
    },
  });

  return (
    <>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <ModalTitle>Xác nhận xóa đơn hàng</ModalTitle>
        <ModalBody>
          <div className="p-2">Xác nhận xóa đơn hàng {order._id}?</div>
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
              onClick={deleteOrder}
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
      <IconButton onClick={() => setIsOpenModal(true)}>
        <TrashIcon className="h-[2rem] w-[2rem] cursor-pointer" />
      </IconButton>
    </>
  );
};
export default RemoveOrderButton;
