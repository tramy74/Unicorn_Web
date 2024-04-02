"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Box, Typography } from "@mui/material";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InforColor({ dataProduct }) {
  const router = useRouter();

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
                Màu sắc:
              </Typography>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                {dataProduct.product_color.product_color_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {dataProduct?.relation_products?.map((relationProduct) => (
                <Link
                  key={relationProduct.product_color.product_color_code}
                  href={`${ROUTERS_PATH.HOME_PRODUCT}/${relationProduct._id}`}
                  replace={true}
                >
                  <div
                    className={clsx(
                      "border-2 border-solid ",
                      {
                        "border-gray-500":
                          dataProduct.product_color.product_color_code ===
                          relationProduct.product_color.product_color_code,
                        "border-transparent":
                          dataProduct.product_color.product_color_code !==
                          relationProduct.product_color.product_color_code,
                      },
                      "p-2 transition duration-300 ease-in hover:border-gray-500"
                    )}
                  >
                    <Box
                      className="border-[1px] border-solid border-gray-500"
                      sx={{
                        cursor: "pointer",
                        minWidth: "4rem",
                        height: "4rem",
                        backgroundColor:
                          relationProduct.product_color.product_color_code,
                      }}
                    ></Box>
                  </div>
                </Link>
              ))}
            </Box>
          </div>
        </>
      )}
    </>
  );
}
