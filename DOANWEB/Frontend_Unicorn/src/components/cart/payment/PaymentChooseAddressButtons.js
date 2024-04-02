"use client";
import PAYMENT_MESSAGES from "@/configs/config.payment.messages";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { setCartAddress } from "@/redux/actions/cart";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { Button, Radio, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
function PaymentChooseAddressButtons({ address }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { address: addressChoose } = useSelector((state) => state.cart);

  const handleChooseAddress = () => {
    dispatch(setCartAddress({ address }));
  };
  const handleDeleteAddress = async ({}) => {
    try {
      if (addressChoose._id === address._id) {
        toast.error(PAYMENT_MESSAGES.CANOT_REMOVE_CHOOSING_ADDRESS_ITEM);
        return;
      }
      dispatch(setIsLoading(true));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/delete`,
        {
          addressId: address._id,
        }
      );

      // Update cache react query
      // Invalidate and refetch list address
      await queryClient.invalidateQueries({
        queryKey: ["get-list-addresses-user"],
      });
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="address-operation">
      <div className="operation-stack">
        {address.default && (
          <div className="text-sm text-green-700">Mặc định</div>
        )}
        <Radio
          sx={{ fontSize: "0.9rem", textAlign: "center" }}
          checked={addressChoose?._id === address._id || false}
          onChange={handleChooseAddress}
        />
        <Stack spacing={2} sx={{ padding: "1rem 0" }}>
          <Button
            className="delete-address-button-df !bg-[#38AC8F] drop-shadow-lg"
            onClick={handleDeleteAddress}
          >
            Xóa
          </Button>
          <Button
            className="edit-address-button drop-shadow-lg"
            onClick={() =>
              router.push(`${ROUTERS_PATH.PROFILE}/address/${address._id}`)
            }
          >
            Sửa thông tin
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default PaymentChooseAddressButtons;
