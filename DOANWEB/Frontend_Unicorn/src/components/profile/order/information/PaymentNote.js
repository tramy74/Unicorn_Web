"use client";
import { Stack, TextField } from "@mui/material";

function PaymentNote({ note }) {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "2rem",
      }}
    >
      <h2 className="text-[2.5rem] font-bold">Ghi chú</h2>
      <TextField
        disabled
        value={note ? note : "Không có ghi chú"}
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
        id="outlined-multiline-static"
        multiline
        rows={3}
      />
    </Stack>
  );
}

export default PaymentNote;
