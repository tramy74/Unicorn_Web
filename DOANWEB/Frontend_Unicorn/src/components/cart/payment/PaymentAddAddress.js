"use client";
import AddressForm from "@/components/profile/address/AddressForm";
import { TYPE_ADDRESS_FORM } from "@/configs/config.users.address";
import { Stack } from "@mui/material";

function PaymentAddAddress({ setOpenListAvailableAddress }) {
  const addressInformation = {
    fullName: "",
    phoneNumber: "",
    detailAddrress: "",
    provine: "",
    district: "",
    ward: "",
    default: false,
    addressId: "",
  };

  return (
    <Stack>
      <AddressForm
        setOpenListAvailableAddress={setOpenListAvailableAddress}
        type={TYPE_ADDRESS_FORM.ADD}
        addressInformation={addressInformation}
      />
    </Stack>
  );
}

export default PaymentAddAddress;
