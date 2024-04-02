"use client";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
export default function InforSize({
  dataProduct,
  productData,
  setProductData,
  isAvailableProduct,
}) {
  const checkIsAvailableProduct = (sizeQuantities = 0) => {
    if (sizeQuantities <= 0) {
      return false;
    }

    return true;
  };
  return (
    <>
      {dataProduct && (
        <>
          <div className="flex flex-col gap-4">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                }}
              >
                Kích cỡ:
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                {productData.size}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {dataProduct?.product_sizes?.map((item) => (
                <div
                  key={item._id}
                  className={clsx(
                    "border-2 border-solid ",
                    {
                      "border-gray-500":
                        productData.size === item.size_type.product_size_name,
                      "border-transparent":
                        productData.size != item.size_type.product_size_name,
                    },
                    "p-2 transition duration-300 ease-in",
                    "hover:border-gray-500"
                  )}
                >
                  <Box
                    className={clsx(
                      "relative border-[1px] border-solid border-gray-500 transition duration-200 ease-linear",
                      {
                        "bg-black":
                          productData.size === item.size_type.product_size_name,
                        "!text-gray-200":
                          productData.size === item.size_type.product_size_name,
                      },
                      [
                        !checkIsAvailableProduct(item.size_quantities) && [
                          "after:absolute",
                          "after:content-['']",
                          "after:inset-0",
                          "after:bg-[rgba(255,255,255,0.3)]",
                          "after:bg-[url(https://asset.uniqlo.com/g/icons/chip_disabled.svg)]",
                          "after:bg-left-top",
                          "after:bg-cover",
                          "after:bottom-0",
                        ],
                      ]
                    )}
                    onClick={() =>
                      setProductData((productData) => ({
                        ...productData,
                        size: item.size_type.product_size_name,
                        sizeId: item.size_type._id,
                        stockSizeQuantities: item.size_quantities,
                      }))
                    }
                    sx={{
                      minWidth: "4rem",
                      height: "4rem",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography className="!font-semibold">
                      {item.size_type.product_size_name}
                    </Typography>
                  </Box>
                </div>
              ))}
            </Box>
          </div>
        </>
      )}
    </>
  );
}
