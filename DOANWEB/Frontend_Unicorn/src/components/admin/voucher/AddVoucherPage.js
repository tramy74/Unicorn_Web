"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import {
  TYPE_VOUCHER_ITEM_DISPLAY,
  convertTypeVoucher,
} from "@/configs/config.vouchers";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import { parseInt } from "lodash";
import Randomstring from "randomstring";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users/get-all`
    );
    const data = response.data.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export default function AddVoucherPage() {
  const dispatch = useDispatch();

  const { data: listUsers } = useQuery(["list-all-users"], () => getAllUsers());

  // form validation rules
  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .required("Vui lòng nhập người nhận mã giảm giá")
      .strict(true),
    code: Yup.string()
      .required("Vui lòng nhập mã giảm giá")
      .trim("Vui lòng nhập mã giảm giá hợp lệ")
      .strict(true),
    type: Yup.string().required("Vui lòng nhập loại giảm giá").strict(true),
    discount: Yup.number()
      .required("Vui lòng nhập % giảm giá hợp lệ")
      .min(1, "Vui lòng nhập % giảm giá hợp lệ")
      .max(100, "Vui lòng nhập % giảm giá hợp lệ")
      .strict(true),
    minOrderQuantity: Yup.number()
      .required("Vui lòng nhập số lượng sản phẩm áp dụng hợp lệ")
      .min(0, "Vui lòng nhập số lượng sản phẩm áp dụng hợp lệ")
      .strict(true),
    minOrderAmount: Yup.number()
      .required("Vui lòng nhập tổng tiền đơn hàng áp dụng hợp lệ")
      .min(0, "Vui lòng nhập tổng tiền đơn hàng áp dụng hợp lệ")
      .strict(true),
    description: Yup.string()
      .required("Vui lòng nhập mô tả voucher hợp lệ")
      .strict(true),
    status: Yup.boolean().required().strict(true),
    expiredDate: Yup.string()
      .required("Vui lòng nhập ngày hết hạn hợp lệ")
      .strict(true),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: true,
      discount: 0,
      minOrderAmount: 0,
      minOrderQuantity: 0,
    },
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
    setValue,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const {
        user,
        type,
        status,
        code,
        discount,
        minOrderAmount,
        minOrderQuantity,
        description,
        expiredDate,
      } = data;

      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/vouchers`,
        {
          userId: user,
          code,
          discount,
          description,
          minOrderQuantity,
          minOrderAmount,
          expiredDate,
          type,
          status,
        }
      );

      toast.success(request.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(err.response?.data?.message);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <span className="income-text">Thêm voucher</span>
      <div className="add-product-container flex flex-row gap-4">
        <div className="add-product-infomation w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className="add-product-pt">
              <Controller
                defaultValue=""
                name="user"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Người nhận</span>
                    <FormControl>
                      <Select
                        error={errors.user ? true : false}
                        inputRef={ref}
                        {...field}
                      >
                        <MenuItem value={""}>Không</MenuItem>
                        {listUsers?.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.email}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
              <ErrorMessage>
                {errors.user ? errors.user.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="code"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Code</span>
                    <TextField
                      error={errors.code ? true : false}
                      inputRef={ref}
                      {...field}
                    ></TextField>
                    <Button
                      onClick={() => {
                        const randomVoucher = Randomstring.generate({
                          length: 15,
                          capitalization: "uppercase",
                        });
                        field.onChange(randomVoucher);
                      }}
                    >
                      Random
                    </Button>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.code ? errors.code.message : ""}
              </ErrorMessage>
            </Stack>

            <Stack direction="row" spacing={2} className="add-product-pt">
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Tình trạng</span>
                      <FormControl>
                        <Select
                          error={errors.status ? true : false}
                          inputRef={ref}
                          {...field}
                        >
                          <MenuItem value={true}>Hiển thị</MenuItem>
                          <MenuItem value={false}>Ẩn</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                />
                <ErrorMessage>
                  {errors.status ? errors.status.message : ""}
                </ErrorMessage>
              </Stack>
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Loại voucher</span>
                      <FormControl>
                        <Select
                          error={errors.type ? true : false}
                          inputRef={ref}
                          {...field}
                        >
                          {Object.entries(TYPE_VOUCHER_ITEM_DISPLAY).map(
                            ([key, value], index) => (
                              <MenuItem key={value} value={value}>
                                {convertTypeVoucher(value)}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </>
                  )}
                />
                <ErrorMessage>
                  {errors.type ? errors.type.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack className="add-product-pt">
              <Controller
                name="description"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Mô tả</span>
                    <TextField
                      error={errors.description ? true : false}
                      inputRef={ref}
                      {...field}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.description ? errors.description.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="discount"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>% Giảm giá</span>
                    <TextField
                      type={"number"}
                      error={errors.discount ? true : false}
                      inputRef={ref}
                      {...field}
                      onChange={(e) => {
                        const parseIntValue = parseInt(e.target.value);
                        field.onChange(parseIntValue);
                      }}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.discount ? errors.discount.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="minOrderQuantity"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Số lượng sản phẩm áp dụng tối thiểu</span>
                    <TextField
                      type={"number"}
                      error={errors.minOrderQuantity ? true : false}
                      inputRef={ref}
                      {...field}
                      onChange={(e) => {
                        const parseIntValue = parseInt(e.target.value);
                        field.onChange(parseIntValue);
                      }}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.minOrderQuantity ? errors.minOrderQuantity.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="minOrderAmount"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Tổng tiền áp dụng tối thiểu</span>
                    <TextField
                      type={"number"}
                      error={errors.minOrderAmount ? true : false}
                      inputRef={ref}
                      {...field}
                      onChange={(e) => {
                        const parseIntValue = parseInt(e.target.value);
                        field.onChange(parseIntValue);
                      }}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.minOrderAmount ? errors.minOrderAmount.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="expiredDate"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl>
                      <span>Ngày hết hạn</span>
                      <DateTimePicker
                        error={errors.expiredDate ? true : false}
                        inputRef={ref}
                        {...field}
                        onChange={(date) => {
                          const selectedDate =
                            dayjs(date).format("YYYY-MM-DD hh:mm A");

                          field.onChange(selectedDate);
                        }}
                      />
                    </FormControl>
                  )}
                />
              </LocalizationProvider>
              <ErrorMessage>
                {errors.expiredDate ? errors.expiredDate.message : ""}
              </ErrorMessage>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                padding: "2rem 0",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="confirm-add-product"
              >
                Xác Nhận
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}
