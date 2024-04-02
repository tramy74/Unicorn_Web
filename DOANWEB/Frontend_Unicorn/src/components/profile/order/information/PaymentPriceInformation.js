"use client";
import { ConvertMoney } from "@/utils/convertMoney";
import { Stack } from "@mui/material";

function PaymentPriceInformation({
  subTotal,
  shippingCost,
  discountAmount,
  total,
}) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 2rem 0",
        }}
      >
        <div className="text-[1.8rem] font-medium">Tạm tính:</div>

        <div className="text-[1.8rem] font-semibold">
          <ConvertMoney money={subTotal} />
        </div>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 2rem 0",
          borderTop: "0.1rem solid rgba(0, 0, 0, .125)",
        }}
      >
        <div className="text-[1.8rem] font-medium">Phí vận chuyển:</div>
        <div className="text-[1.8rem] font-semibold">
          <ConvertMoney money={shippingCost} />
        </div>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 2rem 0",
          borderTop: ".1rem solid rgba(0, 0, 0, .125)",
        }}
      >
        <div className="text-[1.8rem] font-medium">Mã giảm giá:</div>
        <div className="text-[1.8rem] font-semibold text-[#38AC8F]">
          {" "}
          -
          <ConvertMoney money={discountAmount} />
        </div>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 2rem",
          borderTop: ".1rem solid rgba(0, 0, 0, .125)",
        }}
      >
        <div className="text-[2rem] font-semibold">Tổng cộng:</div>
        <div className="text-[2rem] font-semibold">
          <ConvertMoney money={total} />
        </div>
      </Stack>
      <Stack direction="row"></Stack>
    </Stack>
  );
}

export default PaymentPriceInformation;
