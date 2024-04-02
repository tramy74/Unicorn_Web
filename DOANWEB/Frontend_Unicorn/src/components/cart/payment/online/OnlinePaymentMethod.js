"use client";
import { ORDER_ONLINE_PAYMENT_METHOD } from "@/configs/config.orders";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Radio } from "@mui/material";

function OnlinePaymentMethod({
  handleChangeMethodPayMent,
  selectMethodPayment,
}) {
  const payMethod = [
    {
      title: "Thanh toán VNPAY",
      value: ORDER_ONLINE_PAYMENT_METHOD.VNPAY,
      icon: <CreditCardIcon className="h-full" />,
    },
  ];
  return (
    <>
      <div className="mx-auto w-full max-w-[60rem]">
        <h2 className="p-8 text-[2.5rem] font-bold">
          Phương thức thanh toán online
        </h2>
        <div className="px-8 ">
          <div
            className="flex flex-col overflow-hidden "
            style={{
              width: "100%",
              border: ".1rem solid rgba(0, 0, 0, .125)",
              borderRadius: "1rem",
            }}
          >
            {payMethod.map((item) => (
              <div
                className="flex cursor-pointer items-center justify-between px-8 py-4 transition-all duration-150 ease-in hover:bg-[#eeeeee]"
                style={{
                  borderTop: ".1rem solid rgba(0, 0, 0, .125)",
                }}
                key={item.value}
                onClick={() => handleChangeMethodPayMent(item.value)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-[3.5rem] w-[3.5rem]">{item.icon}</div>
                  <span className="text-[1.7rem] font-medium">
                    {item.title}
                  </span>
                </div>
                <Radio
                  checked={selectMethodPayment === item.value}
                  onChange={(e) => handleChangeMethodPayMent(e.target.value)}
                  value={item.value}
                  name="radio-buttons"
                  inputProps={{ "aria-label": item.value }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlinePaymentMethod;
