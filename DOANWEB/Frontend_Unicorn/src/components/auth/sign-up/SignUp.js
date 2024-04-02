"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import ROUTERS_PATH from "@/configs/config.routers.path";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import USER_MESSAGES from "@/configs/config.users.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

function SignUp() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(USER_MESSAGES.EMAIL_MISSING)
      .email(USER_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, USER_MESSAGES.EMAIL_INVALID)
      .trim(USER_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password: Yup.string()
      .required(USER_MESSAGES.PASSWORD_MISSING)
      .min(
        USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
        USER_MESSAGES.PASSWORD_MIN_LENGTH
      )
      .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
      .trim()
      .strict(true),
    name: Yup.string().required(USER_MESSAGES.NAME_MISSING).trim().strict(true),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], USER_MESSAGES.PASSWORD_CONFIRM)
      .required(USER_MESSAGES.CONFIRM_PASSWORD_MISSING)
      .trim()
      .strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    dispatch(setIsLoading(true));
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users`,
        {
          email: data.email,
          password: data.password,
          name: data.name,
        }
      );

      toast.success(result.data?.message);
      reset();
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleLoginNav = () => {
    router.push("/sign-in");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Container>
      <div className="register-container shadow-md">
        <div className="register-left-panel hidden md:block">
          <span>Hello, Friend!</span>
          <p>Enter your personal details and start journey with us</p>
          <Button
            onClick={handleLoginNav}
            sx={{
              width: "55%",
              padding: " 2rem 12rem",
              borderRadius: "2.5rem",
              backgroundColor: "transparent",
              fontWeight: "300",
              border: "0.1rem #fff solid",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            className="Login-nav-button"
          >
            Login
          </Button>
        </div>
        <div className="register-right-panel w-full">
          <div className="register-right-panel-header">
            <span className="register-title">Create Account</span>
            <Link href="/">
              <GoogleIcon />
            </Link>
            <span className="register-solution">
              or use your email for registration:
            </span>
          </div>
          <div className="register-right-panel-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <InputLabel htmlFor="Name">Name</InputLabel>
                    <OutlinedInput
                      label="Name"
                      inputRef={ref}
                      {...field}
                      error={!!errors.name}
                      id="Name"
                      endAdornment={
                        <InputAdornment position="end">
                          <PersonOutlineOutlinedIcon
                            sx={{
                              fontSize: "3rem",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.name ? errors.name.message : ""}
              </ErrorMessage>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <InputLabel htmlFor="Email">Email</InputLabel>
                    <OutlinedInput
                      label="Email"
                      id="Email"
                      inputRef={ref}
                      {...field}
                      error={!!errors.email}
                      endAdornment={
                        <InputAdornment position="end">
                          <EmailOutlinedIcon
                            sx={{
                              fontSize: "3rem",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.email ? errors.email.message : ""}
              </ErrorMessage>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <InputLabel htmlFor="Password">Password</InputLabel>
                    <OutlinedInput
                      label="Password"
                      id="Password"
                      type={showPassword ? "text" : "password"}
                      inputRef={ref}
                      {...field}
                      error={!!errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.password ? errors.password.message : ""}
              </ErrorMessage>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <InputLabel htmlFor="ConfirmPassword">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      label="ConfirmPassword"
                      id="ConfirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      inputRef={ref}
                      {...field}
                      error={!!errors.confirmPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.confirmPassword ? errors.confirmPassword.message : ""}
              </ErrorMessage>

              <Link
                className="block md:hidden"
                href={ROUTERS_PATH.SIGN_IN}
                style={{
                  borderBottom: "0.1rem solid #000",
                  margin: "3rem 0",

                  padding: "0 0.4rem",
                  width: "50%",
                  position: "relative",
                  transform: "translateX(-50%)",
                  left: "50%",
                }}
              >
                Login account?
              </Link>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                sx={{
                  position: "relative",
                  transform: "translateX(50)",
                  width: "55%",
                  padding: "1.4rem 4rem",
                  borderRadius: "2.5rem",
                  boxShadow: "0.1rem 0.1rem 0.1rem 0 #333",
                  marginTop: "1rem",
                }}
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
