"use client";
import { setCartNote } from "@/redux/actions/cart";
import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PaymentNote() {
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  useEffect(() => {
    dispatch(setCartNote({ note }));
  }, [note]);
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "2rem",
      }}
    >
      <h2 className="text-[2.5rem] font-bold">Ghi chú</h2>
      <TextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
        id="outlined-multiline-static"
        multiline
        placeholder="Nhập ghi chú..."
        rows={3}
      />
    </Stack>
  );
}

export default PaymentNote;
