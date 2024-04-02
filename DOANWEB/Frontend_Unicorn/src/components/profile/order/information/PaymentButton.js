"use client";
import {
  ORDER_DELIVERY_STATUSES,
  ORDER_PAYMENT_METHODS,
} from "@/configs/config.orders";
import { Button } from "@mui/material";
import Link from "next/link";
function PaymentButton({ orderId, paymentMethod, orderStatus }) {
  return (
    <>
      <div className="mb-8 text-center">
        {paymentMethod === ORDER_PAYMENT_METHODS.BANKING &&
          orderStatus === ORDER_DELIVERY_STATUSES.PAYMENT_PENDING && (
            <Link href={"/cart/payment/online/" + orderId}>
              <Button
                className="drop-shadow-xl"
                sx={{
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  fontSize: "2rem",
                }}
              >
                Thanh toán
              </Button>
            </Link>
          )}
      </div>
    </>
  );
}

export default PaymentButton;
