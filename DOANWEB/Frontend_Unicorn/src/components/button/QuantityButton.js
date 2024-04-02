"use client";
import { TYPE_SET_PRODUCT_QUANTITY } from "@/configs/config.products";
import { Box } from "@mui/material";

export default function QuantityButton({
  quantity,
  handleChangeQuantity,
  handleSetQuantity,
}) {
  return (
    <>
      <Box
        className="divide-y divide-gray-200 !border-gray-400 drop-shadow-sm"
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          border: "2px solid",
        }}
      >
        <Box
          onClick={() => handleSetQuantity(TYPE_SET_PRODUCT_QUANTITY.DECREASE)}
          sx={{
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          -
        </Box>
        <input
          type="number"
          className="max-w-[5rem] border-gray-400 p-1 text-center text-base font-medium focus:outline-none md:p-2 md:text-base"
          value={quantity}
          onWheel={(event) => event.currentTarget.blur()}
          onChange={(e) => handleChangeQuantity(e.target.value)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />

        <Box
          onClick={() => handleSetQuantity(TYPE_SET_PRODUCT_QUANTITY.INCREASE)}
          sx={{
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          +
        </Box>
      </Box>
    </>
  );
}
