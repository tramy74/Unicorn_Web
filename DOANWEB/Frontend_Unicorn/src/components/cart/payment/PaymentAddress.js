"use client";
import { setCartShippingCost } from "@/redux/actions/cart";
import { Radio, Stack, Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PaymentAddAddress from "./PaymentAddAddress";
import PaymentChooseAddress from "./PaymentChooseAddress";

//style for accordion
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? "#EEEEEE" : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: ".1rem solid rgba(0, 0, 0, .125)",
}));
const DEFAULT_SHIPPING_COST = 30000;
function PaymentAddress() {
  const [expanded, setExpanded] = useState("available_address");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCartShippingCost({ shippingCost: DEFAULT_SHIPPING_COST }));
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const setOpenListAvailableAddress = () => {
    setExpanded("available_address");
  };

  return (
    <Stack
      className="divide-y divide-gray-200 shadow-xl"
      sx={{
        backgroundColor: "#EEEEEE",
        borderRadius: "1rem",
        overflow: "hidden",

        // border: "0.1rem solid rgba(0, 0, 0, .125)",
      }}
    >
      <h2 className="text-[2.5rem] font-bold" style={{ padding: "2rem" }}>
        Địa chỉ nhận hàng
      </h2>
      <Accordion
        expanded={expanded === "available_address"}
        onChange={handleChange("available_address")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Radio
            checked={expanded === "available_address"}
            sx={{
              fontSize: ".9rem",
              alignSelf: "center",
              display: "flex",
            }}
          />
          <Typography
            sx={{ alignSelf: "center", display: "flex", fontWeight: 500 }}
          >
            Địa chỉ có sẵn
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentChooseAddress />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "new_address"}
        onChange={handleChange("new_address")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Radio
            checked={expanded === "new_address"}
            sx={{
              fontSize: ".9rem",
              alignSelf: "center",
              display: "flex",
            }}
          />
          <Typography
            sx={{ alignSelf: "center", display: "flex", fontWeight: 500 }}
          >
            Thêm địa chỉ mới
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentAddAddress
            setOpenListAvailableAddress={setOpenListAvailableAddress}
          />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default PaymentAddress;
