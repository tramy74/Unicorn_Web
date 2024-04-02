"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import ADMIN_MESSAGES from "@/configs/config.admin.messages";
import { TYPE_ADMIN_USERS_FORM } from "@/configs/config.admin.users";
import ROUTERS_PATH from "@/configs/config.routers.path";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import USER_GENDERS from "@/configs/config.users.genders";
import USER_ROLES from "@/configs/config.users.roles";
import USER_STATUSES from "@/configs/config.users.statuses";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { convertUserGender } from "@/utils/convertGender";
import { convertUserRole } from "@/utils/convertRole";
import { convertUserStatus } from "@/utils/convertStatus";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function UserForm({ type, userFormInformation }) {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    status,
    gender,
    role,
    birthday,
  } = userFormInformation;
  useEffect(() => {
    console.log({ birthday });
  }, [userFormInformation]);
  const [genderVal, setGenderVal] = useState(gender);
  const [roleVal, setRoleVal] = useState(role);
  const [statusVal, setStatusVal] = useState(status);
  const [passwordVal, setPasswordVal] = useState(password);
  const [changeDate, setChangeDate] = useState(birthday);
  const [fullNameValue, setFullNameValue] = useState(fullName);
  const [emailValue, setEmailValue] = useState(email);
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);
  const [isChangePassWord, setIsChangePassWord] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { userId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userFormInformation) {
      setGenderVal(userFormInformation.gender);
      setRoleVal(userFormInformation.role);
      setStatusVal(userFormInformation.status);
      setPasswordVal(userFormInformation.password);
      setChangeDate(userFormInformation.birthday);
      setFullNameValue(userFormInformation.fullName);
      setEmailValue(userFormInformation.email);
      setPhoneNumberValue(userFormInformation.phoneNumber);
    }
  }, [userFormInformation]);

  if (newPassword) {
    setIsChangePassWord(true);
  }
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(ADMIN_MESSAGES.NAME_MISSING)
      .trim(ADMIN_MESSAGES.NAME_INVALID)
      .strict(true),
    phoneNumber: Yup.string()
      .required(ADMIN_MESSAGES.PHONE_NUMBER_MISSING)
      .matches(/^(0|84)[0-9]{9,11}$/, ADMIN_MESSAGES.PHONE_NUMBER_INVALID)
      .trim(ADMIN_MESSAGES.PHONE_NUMBER_INVALID)
      .strict(true),
    email: Yup.string()
      .required(ADMIN_MESSAGES.EMAIL_MISSING)
      .trim(ADMIN_MESSAGES.EMAIL_INVALID)
      .email(ADMIN_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, ADMIN_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password:
      type === TYPE_ADMIN_USERS_FORM.EDIT
        ? newPassword
          ? Yup.string()
              .trim(ADMIN_MESSAGES.PASSWORD_INVALID)
              .min(
                USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
                ADMIN_MESSAGES.PASSWORD_MIN_LENGTH
              )
              .matches(/^\S*$/, ADMIN_MESSAGES.PASSWORD_INVALID)
              .strict(true)
          : Yup.string()
        : Yup.string()
            .required(ADMIN_MESSAGES.PASSWORD_MISSING)
            .trim(ADMIN_MESSAGES.PASSWORD_INVALID)
            .min(
              USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
              ADMIN_MESSAGES.PASSWORD_MIN_LENGTH
            )
            .matches(/^\S*$/, ADMIN_MESSAGES.PASSWORD_INVALID)
            .strict(true),
    status: Yup.boolean().required(ADMIN_MESSAGES.STATUS_MISSING).strict(true),
    gender: Yup.string().required(ADMIN_MESSAGES.GENDER_MISSING).strict(true),
    birthday: Yup.string()
      .required(ADMIN_MESSAGES.BIRTHDAY_MISSING)
      .strict(true),

    role: Yup.string().required(ADMIN_MESSAGES.ROLE_MISSING).strict(true),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    userFormInformation,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      const {
        fullName,
        email,
        phoneNumber,
        password,
        status,
        gender,
        role,
        birthday,
      } = data;

      const updatedPassword = password
        ? password
        : userFormInformation.password;
      dispatch(setIsLoading(true));
      let result;
      if (type === TYPE_ADMIN_USERS_FORM.ADD) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users`,
          {
            email: email,
            password: password,
            birthday: birthday,
            gender: gender,
            name: fullName,
            status: status,
            role: role,
            phone_number: phoneNumber,
          }
        );
        reset();
      } else if (type === TYPE_ADMIN_USERS_FORM.EDIT) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users/update`,
          {
            userId: userId,
            email: email,
            password: updatedPassword,
            birthday: birthday,
            gender: gender,
            name: fullName,
            status: status,
            role: role,
            phone_number: phoneNumber,
          }
        );
      }

      queryClient.invalidateQueries({
        queryKey: ["get-list-users", "admin"],
        refetchInactive: true,
      });
      toast.success(result?.data?.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleCancel = () => {
    router.push(ROUTERS_PATH.ADMIN_USER_LIST);
  };

  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">
          {type === TYPE_ADMIN_USERS_FORM.EDIT
            ? "Chỉnh sửa thông tin tài khoản"
            : "Thêm tài khoản"}
        </h1>
      </div>
      <div className="admin-user-add">
        <form onSubmit={handleSubmit(onSubmit)} className="admin-user-add-form">
          <div className="admin-users-add-basicInformation">
            <Stack
              className="input-col"
              sx={{
                textAlign: "start",
                fontSize: "2.6rem",
                fontWeight: "400",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <div className="admin-users-add-title text-[1.5rem]">
                Họ và tên
              </div>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue={fullNameValue}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.fullName}
                        id="fullName"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.fullName ? errors.fullName.message : ""}
                </ErrorMessage>
              </Box>
            </Stack>
            <div className="admin-users-add-title text-[1.5rem]">Email</div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue={emailValue}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    fullWidth
                    id="fullWidth"
                    error={!!errors.email}
                    {...(type === TYPE_ADMIN_USERS_FORM.EDIT
                      ? { disabled: true }
                      : {})}
                  />
                )}
              />
              <ErrorMessage>
                {errors.email ? errors.email.message : ""}
              </ErrorMessage>
            </Box>
            <div className="mt-8 flex flex-col">
              <div className="admin-users-add-title text-[1.5rem]">
                Số điện thoại
              </div>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={phoneNumberValue}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      error={!!errors.phoneNumber}
                      fullWidth
                      id="fullWidth"
                    />
                  )}
                />
                <ErrorMessage>
                  {errors.phoneNumber ? errors.phoneNumber.message : ""}
                </ErrorMessage>
              </Box>
            </div>
          </div>

          <div className="admin-users-add-other">
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Mật khẩu
                </div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Controller
                    name="password"
                    control={control}
                    defaultValue={passwordVal}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        error={!!errors.password}
                        fullWidth
                        id="fullWidth"
                      />
                    )}
                  />
                  <ErrorMessage>
                    {errors.password ? errors.password.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Trạng thái
                </div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={status}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          error={!!errors.status}
                          value={statusVal}
                          onChange={(e) => {
                            const selectedStatus = e.target.value === "true";
                            setStatusVal(e.target.value);
                            field.onChange(selectedStatus);
                          }}
                        >
                          {Object.entries(USER_STATUSES).map(([key, value]) => (
                            <MenuItem key={value} value={String(value)}>
                              {convertUserStatus(value)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.status ? errors.status.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Giới tính
                </div>
                <Box>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={gender}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={genderVal}
                          error={!!errors.gender}
                          onChange={(e) => {
                            setGenderVal(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        >
                          {Object.entries(USER_GENDERS).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {convertUserGender(value)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.gender ? errors.gender.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Vai trò
                </div>
                <Box>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={role}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={roleVal}
                          error={!!errors.role}
                          onChange={(e) => {
                            setRoleVal(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        >
                          {Object.entries(USER_ROLES).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {convertUserRole(value)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.role ? errors.role.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Ngày sinh
                </div>
                <Box>
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={() => {
                      if (!birthday) {
                        return null;
                      }
                      return birthday;
                    }}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          key={"birthday"}
                        >
                          <DatePicker
                            {...field}
                            inputRef={ref}
                            value={!changeDate ? null : dayjs(changeDate)}
                            onChange={(date) => {
                              const selectedDate = date.format("YYYY-MM-DD");
                              setChangeDate(selectedDate);
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
                </Box>
              </Stack>
            </div>

            <Stack
              spacing="4.9rem"
              direction="row"
              marginTop="7rem"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #ACA3A3",
                  background: " #FFF",
                  color: "#000",
                  fontsize: "2rem",
                  fontstyle: "normal",
                  fontweight: "600",
                  lineheight: "normal",
                }}
                onClick={() => handleCancel()}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
              >
                Xác nhận
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}
