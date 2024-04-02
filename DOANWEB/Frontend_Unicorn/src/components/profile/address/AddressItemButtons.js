"use client";

import { setIsLoading } from "@/redux/actions/loadingBox";
import { Button, FormControlLabel, Radio, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

const AddressItemButtons = ({ address }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSetDefaultAddress = async ({ is_default }) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/update`,
        {
          addressId: address._id,
          provine: address.provine,
          district: address.district,
          ward: address.ward,
          fullName: address.full_name,
          phoneNumber: address.phone_number,
          detailAddress: address.detail_address,
          isDefault: is_default,
        }
      );

      // Update cache react query
      // Invalidate and refetch list address
      queryClient.refetchQueries(["get-detail-address", address._id]);

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
  const handleDeleteAddress = async ({}) => {
    try {
      if (address.default) {
        toast.error("Không thể xóa địa chỉ mặc định");
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
    <>
      <div className="address-operation">
        <div className="operation-stack">
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleDeleteAddress}
              className="delete-address-button drop-shadow-lg"
            >
              Xóa
            </Button>
            <Button
              className="edit-address-button drop-shadow-lg"
              onClick={() => router.push(`address/${address._id}`)}
            >
              Sửa thông tin
            </Button>
          </Stack>
          <FormControlLabel
            control={
              <Radio
                checked={address.default}
                onClick={() =>
                  handleSetDefaultAddress({ is_default: !address.default })
                }
              />
            }
            label="Địa chỉ mặc định"
          />
        </div>
      </div>
    </>
  );
};

export default AddressItemButtons;
