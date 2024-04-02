"use client";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function SidebarHome() {
  return (
    <>
      <Link href={ROUTERS_PATH.HOME_PAGE}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: "7rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src="/logo.png" alt="me" width="40" height="40" />
          <Typography
            sx={{
              fontSize: "3rem",
              color: "#FF9EAA",
              fontWeight: "600",
            }}
          >
            Unicorn
          </Typography>
        </Stack>
      </Link>
    </>
  );
}
