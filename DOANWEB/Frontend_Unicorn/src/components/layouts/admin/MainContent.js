"use client";
import useAuth from "@/customHooks/useAuth";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
const MainContent = ({ children }) => {
  const { session } = useAuth();
  useEffect(() => {
    if (session) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session?.user?.accessToken}`;
      axios.defaults.headers.common["X-client-id"] = `${session?.user?._id}`;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  }, [session]);

  return (
    <>
      <Box
        className="h-full border-l-2 border-solid border-[#dcdbdb] bg-white shadow-md"
        sx={{
          padding: "2rem",
          marginTop: "1.5rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default MainContent;
