"use client";
import { convertDateTime } from "@/utils/convertDate";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotificationItem({ item }) {
  const router = useRouter();
  return (
    <>
      <div
        className="notifies-item w-full !flex-col md:!flex-row"
        style={{
          gap: "1rem",
        }}
      >
        <div className="notifies_image">
          <Box
            sx={{
              width: "100%",

              margin: "0 auto",
              position: "relative",
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </div>
        <div className="notifies-infomation w-full flex-1">
          <div className="notifies-title">{item.title}</div>
          <div className="notifies-detail">{item.content}</div>
          <div className="notifies-detail">
            {convertDateTime(item.createdAt)}
          </div>
        </div>
      </div>
    </>
  );
}
