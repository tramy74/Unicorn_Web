"use client";
import {
  ORDER_DELIVERY_STATUSES,
  ORDER_PAYMENT_METHODS,
} from "@/configs/config.orders";
import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  HomeModernIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ClipboardDocumentCheckIcon className="w-8" />,
    2: <CreditCardIcon className="w-8" />,
    3: <InboxIcon className="w-8" />,
    4: <HomeModernIcon className="w-8" />,
    5: <ArchiveBoxIcon className="w-8" />,
    6: <ArchiveBoxXMarkIcon className="w-8" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));
const steps = [
  "Đặt hàng thành công",
  "Chờ thanh toán",
  "Chờ xác nhận",
  "Đang giao hàng",
  "Giao thành công",
  "Đã hủy",
];

function PaymentStep({ orderStatus, paymentMethod }) {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    switch (orderStatus) {
      case ORDER_DELIVERY_STATUSES.PAYMENT_PENDING:
        setCompleted({
          "Đặt hàng thành công": true,
        });
        setActiveStep(0);
        break;
      case ORDER_DELIVERY_STATUSES.PENDING:
        setCompleted({
          "Đặt hàng thành công": true,
          "Chờ thanh toán":
            paymentMethod === ORDER_PAYMENT_METHODS.BANKING ? true : false,
        });
        setActiveStep(2);
        break;
      case ORDER_DELIVERY_STATUSES.DELIVERING:
        setCompleted({
          "Đặt hàng thành công": true,
          "Chờ thanh toán":
            paymentMethod === ORDER_PAYMENT_METHODS.BANKING ? true : false,
          "Chờ xác nhận": true,
        });
        setActiveStep(3);
        break;
      case ORDER_DELIVERY_STATUSES.DELIVERED:
        setCompleted({
          "Đặt hàng thành công": true,
          "Chờ thanh toán":
            paymentMethod === ORDER_PAYMENT_METHODS.BANKING ? true : false,
          "Chờ xác nhận": true,
          "Đang giao hàng": true,
        });
        setActiveStep(4);
        break;
      case ORDER_DELIVERY_STATUSES.CANCELLED:
        setCompleted({
          "Đặt hàng thành công": true,
          "Chờ thanh toán":
            paymentMethod === ORDER_PAYMENT_METHODS.BANKING ? true : false,
          "Chờ xác nhận": true,
        });
        setActiveStep(5);
        break;
      default:
        break;
    }
  }, [orderStatus]);
  const [completed, setCompleted] = useState({});

  return (
    <SimpleBar
      style={{
        maxWidth: 2000,
        width: "100%",
      }}
    >
      <Stepper
        className=" p-[1.6rem] "
        sx={{
          borderRadius: "1rem",

          paddingBottom: "1rem",
          marginBottom: "2rem",
        }}
        nonLinear
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label} completed={completed[label]}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </SimpleBar>
  );
}

export default PaymentStep;
