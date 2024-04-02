"use client";
import { Stack } from "@mui/material";
import AddressItem from "../../address/AddressItem";

function PaymentAddress({ address }) {
  return (
    <Stack
      className="divide-y divide-gray-200 drop-shadow-xl"
      sx={{
        backgroundColor: "#EEEEEE",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <h2 className="text-[2.5rem] font-bold" style={{ padding: "2rem" }}>
        Địa chỉ nhận hàng
      </h2>
      <div className="bg-white p-[1.6rem]">
        <AddressItem address={address} key={address._id} />
      </div>
    </Stack>
  );
}

export default PaymentAddress;
