"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import { setIsLoading } from "@/redux/actions/loadingBox";

import {
  Button,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FormUploadImages from "../../FormUploadImages";

const MAX_SIZE_FILE = 10485760;

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const ContainerDropZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function FormReview({ dataProduct }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const [files, setFiles] = useState([]);
  const [size, setSize] = useState("");
  const [error, setError] = useState({});
  const [isValidateForm, setIsValidateForm] = useState(false);

  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      // async
      const processAcceptFiles = async () => {
        let newFiles = acceptedFiles;

        let removeExistFiles = [];
        newFiles.forEach((item) => {
          if (!files.find((prevFile) => prevFile.name === item.name)) {
            Object.assign(item, {
              preview: URL.createObjectURL(item),
            });
            removeExistFiles.push(item);
          }
        });

        return setFiles((prev) => [...prev, ...removeExistFiles]);
      };

      processAcceptFiles();
    },
    [files]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/webp": [".webp"],
        "image/heic": [],
        "image/jfif": [],
      },
      maxSize: MAX_SIZE_FILE,
      onDropAccepted,
    });
  const handleRemoveImageFile = (filePath) => {
    let currentFiles = [...files];
    currentFiles = currentFiles.filter((item) => item.path !== filePath);
    setFiles(currentFiles);
  };

  useEffect(() => {
    if (isValidateForm) {
      if (!size) {
        setError((prev) => ({
          ...prev,
          size: "Kích thước không được để trống",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          size: undefined,
        }));
      }
      if (rating <= 0 || rating > 5) {
        setError((prev) => ({
          ...prev,
          rating: "Đánh giá không được để trống",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          rating: undefined,
        }));
      }
      if (comment.length < 5) {
        setError((prev) => ({
          ...prev,
          comment: "Nội dung đánh giá phải từ 5 kí tự trở lên",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          comment: undefined,
        }));
      }
    }
  }, [size, comment, rating, isValidateForm]);

  const handleSubmit = async (data) => {
    try {
      let checkValidateForm = false;
      if (!size) {
        checkValidateForm = true;
        setError((prev) => ({
          ...prev,
          size: "Kích thước không được để trống",
        }));
      }
      if (rating <= 0 || rating > 5) {
        checkValidateForm = true;

        setError((prev) => ({
          ...prev,
          rating: "Đánh giá không được để trống",
        }));
      }
      if (comment.length < 5) {
        checkValidateForm = true;

        setError((prev) => ({
          ...prev,
          comment: "Nội dung đánh giá phải từ 5 kí tự trở lên",
        }));
      }
      if (checkValidateForm) {
        setIsValidateForm(checkValidateForm);
        return;
      }
      dispatch(setIsLoading(true));
      let reviewImages = [];
      // Upload images
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
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
        reviewImages = uploadImages.data.data.map((item) => item.fileUrl);
      }

      // create review
      const createNewReview = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/product-reviews`,
        {
          productId: dataProduct._id,
          reviewStart: rating,
          reviewComment: comment,
          reviewImages,
          productSize: size,
        }
      );
      toast.success(createNewReview.data.message);
      setFiles([]);
      setComment("");
      setRating(0);
      setSize("");
      setIsValidateForm(false);
    } catch (err) {
      if (err && err.response) {
        toast.error(`${err.response.data.message}`);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div className="formData">
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
              Tên sản phẩm:
            </span>
            <Stack sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField value={dataProduct.product_name} disabled />
              </FormControl>
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
              Màu:
            </span>
            <Stack sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  value={dataProduct.product_color.product_color_name}
                  disabled
                />
              </FormControl>
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
              Kích thước:
            </span>
            <Stack sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  error={!!error.size}
                >
                  {dataProduct.product_sizes.map((item) => (
                    <MenuItem
                      key={item.size_type._id}
                      value={item.size_type._id}
                    >
                      {item.size_type.product_size_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage>{error.size && error.size}</ErrorMessage>
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
              Đánh giá:
            </span>
            <FormControl className="w-full">
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                precision={1}
                size="large"
              />
              <div className="w-full">
                <ErrorMessage>{error.rating && error.rating}</ErrorMessage>
              </div>
            </FormControl>
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
              Nội dung:
            </span>
            <Stack sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  error={!!error.comment}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  multiline
                  placeholder="Nhập bình luận..."
                  rows={3}
                />
                <ErrorMessage>{error.comment && error.comment}</ErrorMessage>
              </FormControl>
            </Stack>
          </Stack>

          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="user-title-item">Đính kèm hình ảnh</span>
            <FormUploadImages files={files} setFiles={setFiles} />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          sx={{ width: "100%", margin: "2rem 0", padding: "1rem 0" }}
          className="drop-shadow-lg"
        >
          ĐÁNH GIÁ
        </Button>
      </div>
    </>
  );
}
