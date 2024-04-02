"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import USER_MESSAGES from "@/configs/config.users.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
export default function EditPassword({ isLoading }) {
  const dispatch = useDispatch();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  //  CHANGE PASSWORD
  const [checkChangePassword, setCheckChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchemaPassword = Yup.object().shape({
    current_password: Yup.string()
      .required(USER_MESSAGES.OLD_PASSWORD_MISSING)
      .min(
        USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
        USER_MESSAGES.PASSWORD_MIN_LENGTH
      )
      .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
      .trim(USER_MESSAGES.PASSWORD_INVALID)
      .strict(true),
    new_password: Yup.string()
      .required(USER_MESSAGES.PASSWORD_MISSING)
      .min(
        USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
        USER_MESSAGES.PASSWORD_MIN_LENGTH
      )
      .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
      .trim(USER_MESSAGES.PASSWORD_INVALID)
      .strict(true),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], USER_MESSAGES.PASSWORD_CONFIRM)
      .required(USER_MESSAGES.CONFIRM_PASSWORD_MISSING)
      .trim(USER_MESSAGES.PASSWORD_INVALID)
      .strict(true),
  });

  const formOptionsPassword = {
    resolver: yupResolver(validationSchemaPassword),
  };
  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetChangePassword,
  } = useForm(formOptionsPassword);

  const onChangePassWord = async (data) => {
    try {
      dispatch(setIsLoading(true));

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/update-password`,
        {
          current_password: data.current_password,
          new_password: data.new_password,
        }
      );
      resetChangePassword();
      toast.success(result.data.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                checked={checkChangePassword}
                onClick={() => setCheckChangePassword(!checkChangePassword)}
              />
            }
            label="Thay đổi mật khẩu"
          />

          <Transition
            show={checkChangePassword}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={handleSubmitPassword(onChangePassWord)}
            >
              <Controller
                name="current_password"
                control={controlPassword}
                render={({ field: { ref, ...field } }) => (
                  <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="current_password">
                      Mật khẩu hiện tại
                    </InputLabel>
                    <OutlinedInput
                      key={"current_password"}
                      inputRef={ref}
                      error={!!errorsPassword.current_password}
                      {...field}
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            edge="end"
                          >
                            {showCurrentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu hiện tại"
                    />
                  </FormControl>
                )}
              />

              <ErrorMessage>
                {errorsPassword.current_password
                  ? errorsPassword.current_password.message
                  : ""}
              </ErrorMessage>

              <Controller
                name="new_password"
                control={controlPassword}
                render={({ field: { ref, ...field } }) => (
                  <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="new_password">Mật khẩu mới</InputLabel>
                    <OutlinedInput
                      key={"new_password"}
                      inputRef={ref}
                      error={!!errorsPassword.new_password}
                      {...field}
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu mới"
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errorsPassword.new_password
                  ? errorsPassword.new_password.message
                  : ""}
              </ErrorMessage>

              <Controller
                name="confirm_password"
                control={controlPassword}
                render={({ field: { ref, ...field } }) => (
                  <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="confirm_password">
                      Nhập lại mật khẩu mới
                    </InputLabel>
                    <OutlinedInput
                      key={"confirm_password"}
                      inputRef={ref}
                      error={!!errorsPassword.confirm_password}
                      {...field}
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
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
                      label=">Nhập lại mật khẩu mới"
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errorsPassword.confirm_password
                  ? errorsPassword.confirm_password.message
                  : ""}
              </ErrorMessage>
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  margin: "2rem 0",
                  padding: "1rem 0",
                  backgroundColor: "#000000",
                  "&:hover": {
                    backgroundColor: "#000000",
                    filter: "brightness(-1.5)",
                  },
                }}
                className="drop-shadow-lg"
                onClick={() => handleSubmitPassword(onChangePassWord)}
              >
                CẬP NHẬT MẬT KHẨU
              </Button>
            </form>
          </Transition>
        </>
      )}
    </>
  );
}
