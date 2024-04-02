"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import FormUploadImages from "@/components/product/FormUploadImages";
import PRODUCT_MESSAGES from "@/configs/config.products.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const getAllSaleEvents = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/products/sale-events`
    );
    const data = response.data.data;

    return data;
  } catch (error) {
    throw error;
  }
};
const getAllParentProducts = async (gender) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/products/parents?gender=${gender}`
    );
    const data = response.data.data;

    return data;
  } catch (error) {
    throw error;
  }
};
const getCategories = async (gender) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories?gender=${gender}`
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const getColors = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-colors`
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const getSizes = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-sizes`
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

const convertTypeDescription = (type) => {
  if (type === "overview") {
    return "Tổng quan";
  } else if (type === "material") {
    return "Chất liệu";
  }
  return "";
};

export default function AddProductPage() {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState("men");
  const [imagesFile, setImageFiles] = useState([]);
  const { data: saleEvents } = useQuery(["sale-events"], () =>
    getAllSaleEvents()
  );
  const { data: parentProducts } = useQuery(
    ["parent-products", selectedGender],
    () => getAllParentProducts(selectedGender)
  );
  const { data: categories } = useQuery(["categories", selectedGender], () =>
    getCategories(selectedGender)
  );
  const { data: sizes } = useQuery(["sizes"], getSizes);

  const { data: colors } = useQuery(["colors"], getColors);

  // form validation rules
  const validationSchema = Yup.object().shape({
    parentProduct: Yup.string().trim().strict(true),
    productSaleEvent: Yup.string().trim().strict(true),
    productName: Yup.string()
      .required(PRODUCT_MESSAGES.NAME_MISSING)
      .trim(PRODUCT_MESSAGES.NAME_INVALID)
      .strict(true),
    productCategory: Yup.string()
      .required(PRODUCT_MESSAGES.CATEGORY_NAME_MISSING)
      .strict(true),
    productColor: Yup.string()
      .required(PRODUCT_MESSAGES.COLOR_MISSING)
      .strict(true),
    productPrice: Yup.string()
      .required(PRODUCT_MESSAGES.PRICE_INVALID)

      .strict(true),
    productStatus: Yup.boolean().required().strict(true),
    productGender: Yup.string()
      .required(PRODUCT_MESSAGES.GENDER_INVALID)
      .trim(PRODUCT_MESSAGES.GENDER_INVALID)
      .strict(true),

    productSizes: Yup.array().of(
      Yup.object().shape({
        size_type: Yup.string().required(),
        size_quantities: Yup.number().required().integer().min(0),
        is_choose: Yup.boolean().default(false),
      })
    ),

    productDescription: Yup.array().of(
      Yup.object().shape({
        type: Yup.string(),
        content: Yup.string(),
      })
    ),
    productImages: Yup.array()
      .min(1, PRODUCT_MESSAGES.IMAGE_INVALID)
      .of(Yup.mixed()),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      productStatus: true,
      productPrice: "0",
      productGender: selectedGender,
      productDescription: [
        {
          type: "overview",
          content: "",
        },
        {
          type: "material",
          content: "",
        },
      ],
      productSizes:
        sizes?.map((item) => {
          return {
            size_type: item._id,
            size_quantities: 0,
          };
        }) || [],
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

  const watchGender = watch("productGender", selectedGender);

  useEffect(() => {
    setSelectedGender(watchGender);
  }, [watchGender]);

  useEffect(() => {
    setValue("parentProduct", "");
    setValue("productCategory", "");
  }, [selectedGender]);

  const { update: updateProductSize, fields: fieldProductSizes } =
    useFieldArray({ control, name: "productSizes" });
  const { fields: fieldProductDescription } = useFieldArray({
    control,
    name: "productDescription",
  });
  const { fields: fieldProductImages, replace: updateProductImages } =
    useFieldArray({
      control,
      name: "productImages",
    });

  useEffect(() => {
    if (Array.isArray(sizes)) {
      sizes.forEach((item, index) => {
        updateProductSize(index, {
          size_type: item._id,
          size_quantities: 0,
        });
      });
    }
  }, [sizes]);

  useEffect(() => {
    updateProductImages(imagesFile);
  }, [imagesFile]);

  const onSubmitAddProduct = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const {
        parentProduct,
        productName,
        productColor,
        productSizes,
        productCategory,
        productImages,
        productGender,
        productPrice,
        productDescription,
        productSaleEvent,
        productStatus,
      } = data;

      // Update product images
      const formData = new FormData();
      imagesFile.forEach((file) => {
        formData.append("file", file);
      });
      const uploadImages = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-reviews/upload-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let uploadedProductImages = uploadImages.data.data.map(
        (item) => item.fileUrl
      );

      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/products`,
        {
          parentProductId: parentProduct,
          productName: productName,
          productColor: productColor,
          productSizes: productSizes.filter((item) => item.is_choose),
          productCategories: productCategory.split(","),
          productImages: uploadedProductImages,
          productGender: productGender,
          productOriginalPrice: productPrice,
          productDescription: productDescription,
          productSaleEvent,
          productStatus,
        }
      );

      if (!parentProduct) {
        queryClient.invalidateQueries({
          queryKey: ["parent-products", selectedGender],
        });
      }
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
      <span className="income-text">Thêm sản phẩm</span>
      <div className="add-product-container flex flex-row gap-4">
        <div className="add-product-infomation w-full">
          <form onSubmit={handleSubmit(onSubmitAddProduct)}>
            <Stack className="add-product-pt">
              <Controller
                defaultValue=""
                name="parentProduct"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Sản phẩm đại diện</span>
                    <FormControl>
                      <Select {...field}>
                        <MenuItem value={""}>Không</MenuItem>
                        {parentProducts?.map((product) => (
                          <MenuItem key={product._id} value={product._id}>
                            {product.product_name} - {product._id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="productName"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Tên sản phẩm</span>
                    <TextField
                      error={errors.productName ? true : false}
                      inputRef={ref}
                      {...field}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.productName ? errors.productName.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <span>Ảnh sản phẩm</span>
              <FormUploadImages files={imagesFile} setFiles={setImageFiles} />

              <ErrorMessage>
                {errors.productImages ? errors.productImages.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack direction="row" spacing={2} className="add-product-pt">
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="productStatus"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Tình trạng</span>
                      <FormControl>
                        <Select
                          error={errors.productStatus ? true : false}
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
                  {errors.productStatus ? errors.productStatus.message : ""}
                </ErrorMessage>
              </Stack>
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="productGender"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Giới tính</span>
                      <FormControl>
                        <Select
                          error={errors.productGender ? true : false}
                          inputRef={ref}
                          {...field}
                        >
                          <MenuItem value={"men"}>Nam</MenuItem>
                          <MenuItem value={"women"}>Nữ</MenuItem>
                          <MenuItem value={"unisex"}>Unisex</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                />
                <ErrorMessage>
                  {errors.productGender ? errors.productGender.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="productCategory"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Danh mục sản phẩm</span>
                    <FormControl>
                      <Select
                        native
                        error={errors.productCategory ? true : false}
                        inputRef={ref}
                        {...field}
                      >
                        <option aria-label="None" value="">
                          Chưa phân loại
                        </option>
                        {categories?.map((category) => (
                          <optgroup
                            key={category._id}
                            label={category.product_category_name}
                          >
                            <option value={`${category._id}`}>
                              Tất cả {category.product_category_name}
                            </option>
                            {category.child_categories?.map(
                              (child_category, i) => (
                                <option
                                  key={i}
                                  value={`${category._id},${child_category._id}`}
                                >
                                  {child_category.product_category_name}
                                </option>
                              )
                            )}
                          </optgroup>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
              <ErrorMessage>
                {errors.productCategory ? errors.productCategory.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Stack direction="row" spacing={6}>
                <span>Kích cỡ</span>
                <span>Số lượng</span>
              </Stack>
              {fieldProductSizes.map((size, index) => (
                <Stack
                  key={index}
                  className="add-product-pt"
                  direction="row"
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "10rem" }}>
                    <Checkbox
                      {...register(`productSizes[${index}].is_choose`)}
                    />
                    {sizes[index].product_size_name}
                  </Box>
                  <TextField
                    error={
                      errors?.productSizes?.[index]?.size_quantities?.message
                        ? true
                        : false
                    }
                    {...register(`productSizes[${index}].size_quantities`)}
                    onWheel={(e) => e.target.blur()}
                    type="number"
                    sx={{ width: "39.7rem" }}
                  ></TextField>
                </Stack>
              ))}
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="productColor"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Màu sắc</span>
                    <Select
                      error={errors.productColor ? true : false}
                      inputRef={ref}
                      {...field}
                    >
                      {colors?.map((color) => (
                        <MenuItem key={color._id} value={color._id}>
                          {color.product_color_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
              <ErrorMessage>
                {errors.productColor ? errors.productColor.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <span>Mô tả</span>

              {fieldProductDescription.map((description, index) => (
                <Stack
                  key={index}
                  className="add-product-pt"
                  direction="row"
                  sx={{
                    alignItems: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <Box sx={{ width: "10rem" }}>
                    {convertTypeDescription(description.type)}
                  </Box>
                  <TextField
                    error={
                      errors?.productDescription?.[index]?.content?.message
                        ? true
                        : false
                    }
                    {...register(`productDescription[${index}].content`)}
                  ></TextField>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} className="add-product-pt w-1/2">
              <Stack>
                <Controller
                  name="productPrice"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Giá</span>
                      <TextField
                        error={errors.productPrice ? true : false}
                        inputRef={ref}
                        {...field}
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">vnđ</InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </>
                  )}
                />
                <ErrorMessage>
                  {errors.productPrice ? errors.productPrice.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack className="add-product-pt">
              <Controller
                name="productSaleEvent"
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Sự kiện sale</span>
                    <FormControl>
                      <Select {...field}>
                        <MenuItem value={""}>Không có</MenuItem>
                        {saleEvents?.map((sale) => (
                          <MenuItem key={sale._id} value={sale._id}>
                            {sale.sale_event_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
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
                onClick={handleSubmit(onSubmitAddProduct)}
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
