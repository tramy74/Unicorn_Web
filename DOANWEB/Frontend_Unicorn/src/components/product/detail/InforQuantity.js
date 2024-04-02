"use client";
import QuantityButton from "@/components/button/QuantityButton";
import { TYPE_SET_PRODUCT_QUANTITY } from "@/configs/config.products";
import { Typography } from "@mui/material";

export default function InforQuantity({
  dataProduct,
  productData,
  setProductData,
}) {
  const handleChangeQuantity = (value) => {
    let numberValue = value * 1;
    setProductData((productData) => ({
      ...productData,
      quantity: numberValue,
    }));
  };
  const handleSetQuantity = (type) => {
    if (type === TYPE_SET_PRODUCT_QUANTITY.DECREASE) {
      if (productData.quantity === 0) {
        return;
      } else {
        setProductData((productData) => ({
          ...productData,
          quantity: productData.quantity - 1,
        }));
      }
    } else if (type === TYPE_SET_PRODUCT_QUANTITY.INCREASE) {
      setProductData((productData) => ({
        ...productData,
        quantity: productData.quantity + 1,
      }));
    }
  };

  return (
    <>
      {dataProduct && (
        <>
          <Typography
            sx={{
              fontSize: "2rem",
            }}
          >
            Số lượng:
          </Typography>
          <QuantityButton
            quantity={productData.quantity}
            handleChangeQuantity={handleChangeQuantity}
            handleSetQuantity={handleSetQuantity}
          />
        </>
      )}
    </>
  );
}
