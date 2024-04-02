"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { ConvertMoney } from "@/utils/convertMoney";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
function PaymentProductItem({ item }) {
  const [amount, setAmount] = useState(
    item.data.product.product_sale_event
      ? Math.round(
          item.data.product.product_original_price -
            (item.data.product.product_sale_event.sale_discount_percentage *
              item.data.product.product_original_price) /
              100
        ) * item.data.quantities
      : item.data.product.product_original_price * item.data.quantities
  );
  return (
    <Link
      href={ROUTERS_PATH.HOME_PRODUCT + "/" + item.data.product._id}
      className="product-payment-producs-item hover:bg-[#eeeeee]"
      key={ROUTERS_PATH.HOME_PRODUCT + "/" + item.data.product._id}
    >
      <div className="flex w-full flex-row justify-between gap-4 ">
        <Box
          sx={{
            position: "relative",
            width: "10rem",
            minWidth: "10rem",
            height: "10rem",
          }}
        >
          <Image
            src={item.data.product.product_images[0]}
            alt={item.data.product.product_name}
            width={100}
            height={100}
            style={{
              width: "100%",
              objectFit: "contain",
              height: "100%",
            }}
          />
        </Box>
        <div className="flex flex-1 gap-4">
          <div className="product-payment-product-desc flex w-[100%] max-w-[25rem] flex-col gap-4">
            <span
              className="product-payment-product-name three-dots !w-full"
              title={item.data.product.product_name}
            >
              {item.data.product.product_name}
            </span>
            <span className="product-payment-product-color">
              {item.data.product.product_color.product_color_name} /{" "}
              {item.data.size.product_size_name}
            </span>

            <span className="product-payment-product-size">
              Số lượng: {item.data.quantities}
            </span>
          </div>
          {item.data.product.product_sale_event && (
            <div className="flex flex-1 flex-col">
              <span className="product-payment-product-price !text-[1.6rem] !text-black line-through">
                <ConvertMoney
                  money={item.data.product.product_original_price}
                />
              </span>
              <span className="product-payment-product-price flex-1">
                <ConvertMoney money={amount} />
              </span>
            </div>
          )}
          {!item.data.product.product_sale_event && (
            <span className="product-payment-product-price flex-1">
              <ConvertMoney money={item.data.product.product_original_price} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PaymentProductItem;
