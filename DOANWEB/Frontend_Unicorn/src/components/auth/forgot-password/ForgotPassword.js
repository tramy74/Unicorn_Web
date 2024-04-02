"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import USER_MESSAGES from "@/configs/config.users.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(USER_MESSAGES.EMAIL_MISSING)
      .trim(USER_MESSAGES.EMAIL_INVALID)
      .email(USER_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, USER_MESSAGES.EMAIL_INVALID)
      .strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const handleSendOTP = async (data) => {
    try {
      await validationSchema.validate({ email: data }, { abortEarly: false });
      setIsEmailValid(true);
    } catch (validationError) {
      setIsEmailValid(validationError.errors[0]);
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/send-reset-password-otp`,
        {
          email: data,
        }
      );
      toast.success(result.data.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const onSubmit = async (data) => {
    try {
      await validationSchema.validate(
        { email: data.email, otp: data.otp },
        { abortEarly: false }
      );
      setIsEmailValid(true);
    } catch (validationError) {
      setIsEmailValid(validationError.errors[0]);
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/reset-password`,
        {
          email: data.email,
          otp: data.otp,
        }
      );

      toast.success(result.data.message);
      reset();
    } catch (err) {
      toast.error(`Message: ${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div className="forgot-password-container shadow-md">
        <div className="forgot-password-panel">
          <div className="forgot-password-panel-header">
            <span className="forgot-password-title">Forgot Password</span>
            <span className="forgot-password-solution">
              Enter email to retrieve your password
            </span>
          </div>
          <form
            className="forgot-password-panel-body"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormControl
                  sx={{
                    margin: "1.4rem 0",
                    backgroundColor: "#EAEAEA",
                  }}
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={emailValue}
                >
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <OutlinedInput
                    sx={{ padding: "0" }}
                    error={errors.email ? true : false}
                    label="Email"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          sx={{
                            padding: "1.2rem",
                          }}
                          aria-label="toggle password visibility"
                          onClick={() => {
                            handleSubmit();
                            handleSendOTP(emailValue);
                          }}
                          edge="end"
                        >
                          Send OTP
                        </Button>
                      </InputAdornment>
                    }
                    id="Email"
                    type="text"
                    inputRef={ref}
                    {...field}
                  />
                </FormControl>
              )}
              defaultValue=""
            />
            <ErrorMessage>
              {isEmailValid || (errors.email ? errors.email.message : "")}
            </ErrorMessage>

            <Controller
              name="otp"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormControl
                  sx={{
                    margin: "1.4rem 0",
                    backgroundColor: "#EAEAEA",
                  }}
                  // value={otpValue}
                  // onChange={(e) => setOtpValue(e.target.value)}
                >
                  <InputLabel htmlFor="otp">OTP</InputLabel>
                  <OutlinedInput
                    error={errors.password ? true : false}
                    label="OTP"
                    id="otp"
                    inputRef={ref}
                    {...field}
                  />
                </FormControl>
              )}
              defaultValue=""
            />
            <ErrorMessage>{errors.otp ? errors.otp.message : ""}</ErrorMessage>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              sx={{
                marginTop: "1.2rem",
                padding: "1.4rem 4rem",
                boxShadow: "0.1rem 0.1rem 0.1rem 0 #333",
              }}
            >
              Continue
            </Button>

            <Link
              href={"/sign-up"}
              style={{
                borderBottom: "0.1rem solid #000",
                margin: "3rem 0",
                display: "inline-block",
                padding: "0 0.4rem",
                width: "55%",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                cursor: "pointer",
              }}
            >
              Do not have account? Sign up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
