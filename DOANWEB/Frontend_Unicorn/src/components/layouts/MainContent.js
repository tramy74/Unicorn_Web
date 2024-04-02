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
        sx={{
          padding: "0 1rem",
          paddingTop: "12rem",
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default MainContent;
