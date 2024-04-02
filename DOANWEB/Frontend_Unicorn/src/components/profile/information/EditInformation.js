"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import USER_MESSAGES from "@/configs/config.users.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { convertDate } from "@/utils/convertDate";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
export default function EditInformation({ isLoading, dataInformation }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(USER_MESSAGES.NAME_MISSING)
      .trim(USER_MESSAGES.NAME_INVALID)
      .strict(true),
    birthday: Yup.string()
      .matches(
        /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        USER_MESSAGES.BIRTHDAY_INVALID
      )
      .trim()
      .strict(true),
    phone_number: Yup.string()
      .required(USER_MESSAGES.PHONE_NUMBER_MISSING)
      .matches(/^(0|84)[0-9]{9,11}$/, USER_MESSAGES.PHONE_NUMBER_INVALID)
      .trim(USER_MESSAGES.PHONE_NUMBER_INVALID)
      .strict(true),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const [changeDate, setChangeDate] = useState(
    convertDate(dataInformation?.birthday) || "Chưa cài đặt"
  );

  const onSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/update`,
        {
          birthday: data.birthday,
          gender: data.gender,
          name: data.name,
          phone_number: data.phone_number,
        }
      );
      await queryClient.invalidateQueries({
        queryKey: ["user-information"],
      });
      toast.success(result.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(`Message: ${err.response.data.message}`);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      {!isLoading && (
        <form
          className="formData"
          style={{ width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem]"
                style={{ width: "15rem" }}
              >
                Họ và tên:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={dataInformation?.name || "Chưa cài đặt"}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.name}
                        id="Name"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.name ? errors.name.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem]"
                style={{ width: "15rem" }}
              >
                Email:
              </span>
              <Stack sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  disabled
                  value={dataInformation.email}
                  id="Email"
                />
                <ErrorMessage>
                  {errors.email ? errors.email.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem]"
                style={{ width: "15rem" }}
              >
                Ngày sinh:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        inputRef={ref}
                        error={!!errors.birthday}
                      >
                        <DatePicker
                          {...field}
                          value={dayjs(field.value)}
                          defaultValue={dayjs(dataInformation.birthday)}
                          onChange={(date) => {
                            const selectedDate =
                              dayjs(date).format("YYYY-MM-DD");
                            field.onChange(selectedDate);
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  )}
                />

                <ErrorMessage>
                  {errors.birthday ? errors.birthday.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem]"
                style={{ width: "15rem" }}
              >
                Giới tính:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={dataInformation?.gender || "Chưa cài đặt"}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <Select key={"gender"} inputRef={ref} {...field}>
                        <MenuItem value={`male`}>Nam</MenuItem>
                        <MenuItem value={`female`}>Nữ</MenuItem>
                        <MenuItem value={`others`}>Khác</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.gender ? errors.gender.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem]"
                style={{ width: "15rem" }}
              >
                Số điện thoại:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue={dataInformation?.phone_number || "Chưa cài đặt"}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.phone_number}
                        id="PhoneNumber"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.phone_number ? errors.phone_number.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>
          </Stack>
          <Button
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
            sx={{ width: "100%", margin: "2rem 0", padding: "1rem 0" }}
            className="drop-shadow-lg"
          >
            XÁC NHẬN THÔNG TIN
          </Button>
        </form>
      )}
    </>
  );
}
