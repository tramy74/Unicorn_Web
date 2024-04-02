"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import LIST_ADDRESSES_VN from "@/configs/config.address.vn";
import USER_MESSAGES from "@/configs/config.users.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function AddAddress({
  props = {
    fullName: "",
    phoneNumber: "",
    detailAddrress: "",
    provine: "",
    district: "",
    ward: "",
    default: true,
  },
  endPoint = "/api/v1/users/addresses",
}) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const router = useRouter();
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(USER_MESSAGES.NAME_MISSING)
      .trim(USER_MESSAGES.NAME_INVALID)
      .strict(true),
    detailAddress: Yup.string()
      .required(USER_MESSAGES.ADDRESS_MISSING)
      .strict(true),
    phoneNumber: Yup.string()
      .required(USER_MESSAGES.PHONE_NUMBER_MISSING)
      .matches(/^(0|84)[0-9]{9,11}$/, USER_MESSAGES.PHONE_NUMBER_INVALID)
      .trim(USER_MESSAGES.PHONE_NUMBER_INVALID)
      .strict(true),
    provine: Yup.string().required(USER_MESSAGES.PROVINE_MISSING).strict(true),
    district: Yup.string()
      .required(USER_MESSAGES.DISTRICT_MISSING)
      .strict(true),
    ward: Yup.string().required(USER_MESSAGES.WARD_MISSING).strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}${endPoint}`,
        {
          fullName: data.fullName,
          detailAddress: data.detailAddress,
          phoneNumber: data.phoneNumber,
          provine: data.provine,
          district: data.district,
          ward: data.ward,
          isDefault: addressDefault,
          ...(props?.addressid ? { addressId: props.addressid } : {}),
        }
      );
      toast.success(result.data.message);
      queryClient.refetchQueries({
        queryKey: ["get-list-addresses-user"],
      });
      if (!props.addressid) {
        reset();
      } else {
        // revalidate
        queryClient.invalidateQueries({
          queryKey: ["addressid", props.addressid],
        });
      }
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const [addressDefault, setAddressDefault] = useState(props?.default);
  const [provine, setProvine] = useState(props?.provine);
  const [district, setDistrict] = useState(props?.district);
  const [ward, setWard] = useState(props?.ward);

  return (
    <>
      <div className="infomation-container">
        <div className="redirect-title-container">
          <div className="redirect">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>

              <Link underline="hover" color="inherit" href="/profile">
                Hồ sơ
              </Link>

              <Typography color="text.primary">Địa chỉ</Typography>
            </Breadcrumbs>
          </div>
          <div className="profile-page-header">
            <h1>Thông tin tài khoản</h1>
          </div>
        </div>
        <div className="user-desc-container">
          <div className="user-desc-header">
            <span className="user-desc-text">Thông tin cá nhân</span>
            {props?.addressid != undefined ? (
              <Button
                onClick={() => router.push("new")}
                className="edit-infomation-button"
              >
                Thêm địa chỉ
              </Button>
            ) : null}
          </div>
          <div className="user-desc-body">
            <div
              style={{
                width: "100%",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
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
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Họ và tên:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        name="fullName"
                        control={control}
                        defaultValue={props?.fullName}
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
                    </Stack>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyConent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Số điện thoại:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        defaultValue={props?.phoneNumber}
                        name="phoneNumber"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              inputRef={ref}
                              {...field}
                              error={!!errors.phoneNumber}
                              id="PhoneNumber"
                            />
                          </FormControl>
                        )}
                      />
                      <ErrorMessage>
                        {errors.phoneNumber ? errors.phoneNumber.message : ""}
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
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Địa chỉ:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        defaultValue={props?.detailAddrress}
                        name="detailAddress"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              inputRef={ref}
                              {...field}
                              error={!!errors.detailAddress}
                              id="detailAddress"
                            />
                          </FormControl>
                        )}
                      />
                      <ErrorMessage>
                        {errors.detailAddress
                          ? errors.detailAddress.message
                          : ""}
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
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Tỉnh/thành:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        defaultValue={provine}
                        name="provine"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <Select
                              key={"provine"}
                              inputRef={ref}
                              {...field}
                              onChange={(e) => {
                                setProvine(e.target.value);
                                field.onChange(e.target.value);
                              }}
                            >
                              {LIST_ADDRESSES_VN.map((item) => (
                                <MenuItem key={item.name} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />

                      <ErrorMessage>
                        {errors.provine ? errors.provine.message : ""}
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
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Quận/huyện:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        name="district"
                        control={control}
                        defaultValue={district}
                        render={({ field: { ref, ...field } }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <Select
                              key={"district"}
                              inputRef={ref}
                              {...field}
                              onChange={(e) => {
                                setDistrict(e.target.value);
                                field.onChange(e.target.value);
                              }}
                            >
                              {provine !== ""
                                ? (() => {
                                    const index = LIST_ADDRESSES_VN.map(
                                      (item) => item.name
                                    ).indexOf(provine);
                                    return LIST_ADDRESSES_VN[
                                      index
                                    ]?.districts.map((item) => (
                                      <MenuItem
                                        key={item.name}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ));
                                  })()
                                : null}
                            </Select>
                          </FormControl>
                        )}
                      />

                      <ErrorMessage>
                        {errors.district ? errors.district.message : ""}
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
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="user-title-item"
                      style={{ width: "15rem" }}
                    >
                      Phường/xã:
                    </span>
                    <Stack sx={{ width: "100%" }}>
                      <Controller
                        name="ward"
                        control={control}
                        defaultValue={ward}
                        render={({ field: { ref, ...field } }) => (
                          <FormControl sx={{ width: "100%" }}>
                            <Select
                              key={"ward"}
                              inputRef={ref}
                              {...field}
                              onChange={(e) => {
                                setWard(e.target.value);
                                field.onChange(e.target.value);
                              }}
                            >
                              {provine !== "" && district !== ""
                                ? (() => {
                                    const indexProvine = LIST_ADDRESSES_VN.map(
                                      (item) => item.name
                                    ).indexOf(provine);
                                    const indexDistrict = LIST_ADDRESSES_VN[
                                      indexProvine
                                    ]?.districts
                                      .map((item) => item.name)
                                      .indexOf(district);
                                    return LIST_ADDRESSES_VN[
                                      indexProvine
                                    ]?.districts[indexDistrict]?.wards.map(
                                      (item) => (
                                        <MenuItem
                                          key={item.name}
                                          value={item.name}
                                        >
                                          {item.name}
                                        </MenuItem>
                                      )
                                    );
                                  })()
                                : null}
                            </Select>
                          </FormControl>
                        )}
                      />
                      <ErrorMessage>
                        {errors.ward ? errors.ward.message : ""}
                      </ErrorMessage>
                    </Stack>
                  </Stack>
                </Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      checked={addressDefault}
                      onClick={() => setAddressDefault(!addressDefault)}
                    />
                  }
                  label="Địa chỉ mặc định"
                />
                <Button
                  type="submit"
                  onClick={() => handleSubmit(onSubmit)}
                  sx={{ width: "100%", margin: "2rem 0", padding: "1rem 0" }}
                >
                  XÁC NHẬN ĐỊA CHỈ
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
