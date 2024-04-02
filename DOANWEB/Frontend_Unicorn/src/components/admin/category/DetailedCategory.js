"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import FormUploadImages from "@/components/product/FormUploadImages";
import PRODUCT_MESSAGES from "@/configs/config.products.messages";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, Stack, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const getAllParentCategories = async (gender) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-categories/parents?gender=${gender}`
    );
    const data = response.data.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export default function DetailedCategory({ category }) {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState(
    category.product_category_gender
  );
  const [imagesFile, setImageFiles] = useState([]);
  const [defaultImagesFile, setDefaultImageFiles] = useState([
    category.product_category_image,
  ]);

  const { data: parentCategories } = useQuery(
    ["parent-categories", selectedGender],
    () => getAllParentCategories(selectedGender)
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    parentCategory: Yup.string().trim().strict(true),
    categoryName: Yup.string()
      .required(PRODUCT_MESSAGES.CATEGORY_NAME_MISSING)
      .trim(PRODUCT_MESSAGES.CATEGORY_NAME_MISSING)
      .strict(true),
    categoryKeyword: Yup.string()
      .required(PRODUCT_MESSAGES.CATEGORY_KEY_WORD_MISSING)
      .strict(true),
    categoryStatus: Yup.boolean().required().strict(true),
    categoryGender: Yup.string()
      .required(PRODUCT_MESSAGES.CATEGORY_GENDER_MISSING)
      .trim(PRODUCT_MESSAGES.CATEGORY_GENDER_MISSING)
      .strict(true),
    categoryImages: Yup.array().when("defaultImagesFile", {
      is: () => defaultImagesFile.length === 0,
      then: (schema) =>
        schema
          .min(1, PRODUCT_MESSAGES.CATEGORY_IMAGE_INVALID)
          .max(1, PRODUCT_MESSAGES.CATEGORY_IMAGE_INVALID)
          .of(Yup.mixed()),
      otherwise: (schema) =>
        schema
          .min(0, PRODUCT_MESSAGES.CATEGORY_IMAGE_INVALID)
          .max(1, PRODUCT_MESSAGES.CATEGORY_IMAGE_INVALID),
    }),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      parentCategory: category?.product_category_parent_id || "",
      categoryName: category.product_category_name,
      categoryKeyword: category.product_category_keyword,
      categoryStatus: category.status,
      categoryGender: category.product_category_gender,
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

  const watchGender = watch("categoryGender", selectedGender);

  useEffect(() => {
    setSelectedGender(watchGender);
  }, [watchGender]);

  useEffect(() => {
    if (selectedGender !== category.product_category_gender) {
      setValue("parentCategory", "");
    }
  }, [selectedGender]);

  const { fields: fieldProductImages, replace: updateCategoryImages } =
    useFieldArray({
      control,
      name: "categoryImages",
    });

  useEffect(() => {
    updateCategoryImages(imagesFile);
  }, [imagesFile]);

  const onSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const {
        categoryName,
        categoryGender,
        categoryImages,
        categoryKeyword,
        categoryStatus,
        parentCategory,
      } = data;

      let productModifyImages = defaultImagesFile;
      if (categoryImages.length > 0) {
        // Update cateigory images
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
        productModifyImages = productModifyImages.concat(uploadedProductImages);
      }

      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/product-categories/update`,
        {
          parentCategory,
          categoryId: category._id,
          categoryImage: productModifyImages[0],
          categoryGender,
          categoryKeyword,
          categoryName,
          categoryStatus,
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["admin-product-category-information", category._id],
      });

      toast.success(request.data.message);
    } catch (err) {
      if (err && err.response) {
        toast.error(err.response?.data?.message);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleRemoveImageFile = (filePath) => {
    let currentFiles = [...defaultImagesFile];
    currentFiles = currentFiles.filter((item) => item !== filePath);
    setDefaultImageFiles(currentFiles);
  };

  return (
    <>
      <div className="add-product-container flex flex-row gap-4">
        <div className="add-product-infomation w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className="add-product-pt">
              <Controller
                defaultValue=""
                name="parentCategory"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <span>Danh mục đại diện</span>
                    <FormControl>
                      <Select {...field}>
                        <MenuItem value={""}>Không</MenuItem>
                        {parentCategories?.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.product_category_name} - {category._id}
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
                name="categoryName"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Tên danh mục</span>
                    <TextField
                      error={errors.categoryName ? true : false}
                      inputRef={ref}
                      {...field}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.categoryName ? errors.categoryName.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <Controller
                name="categoryKeyword"
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FormControl>
                    <span>Keyword danh mục</span>
                    <TextField
                      error={errors.categoryKeyword ? true : false}
                      inputRef={ref}
                      {...field}
                    ></TextField>
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.categoryKeyword ? errors.categoryKeyword.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack className="add-product-pt">
              <span>Ảnh danh mục</span>
              <span>Danh sách ảnh hiện tại</span>
              <div className="flex flex-col gap-4">
                {defaultImagesFile.map((image) => (
                  <div key={image} className="flex flex-col gap-4">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          objectFit: "cover",
                          position: "relative",
                          margin: "0 auto",
                          height: "10rem",
                          width: "100%",
                        }}
                        className="img"
                      >
                        <Image
                          alt={""}
                          src={image}
                          fill
                          style={{
                            objectFit: "contain",
                          }}
                        />

                        <Box
                          sx={{
                            cursor: "pointer",
                            position: "absolute",
                            right: 0,
                          }}
                          onClick={() => handleRemoveImageFile(image)}
                        >
                          <DeleteForeverIcon
                            sx={{ color: "rgb(207, 55, 61)" }}
                          />
                        </Box>
                      </div>
                    </Box>
                  </div>
                ))}
              </div>
              <FormUploadImages files={imagesFile} setFiles={setImageFiles} />

              <ErrorMessage>
                {errors.categoryImages ? errors.categoryImages.message : ""}
              </ErrorMessage>
            </Stack>
            <Stack direction="row" spacing={2} className="add-product-pt">
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="categoryStatus"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Tình trạng</span>
                      <FormControl>
                        <Select
                          error={errors.categoryStatus ? true : false}
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
                  {errors.categoryStatus ? errors.categoryStatus.message : ""}
                </ErrorMessage>
              </Stack>
              <Stack sx={{ width: "50%" }}>
                <Controller
                  name="categoryGender"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <>
                      <span>Giới tính</span>
                      <FormControl>
                        <Select
                          error={errors.categoryGender ? true : false}
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
                  {errors.categoryGender ? errors.categoryGender.message : ""}
                </ErrorMessage>
              </Stack>
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
