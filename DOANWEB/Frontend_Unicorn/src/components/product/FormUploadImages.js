"use client";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const MAX_SIZE_FILE = 10485760; // 10 MB

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

export default function FormUploadImages({ files, setFiles }) {
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
        "image/avif": [],
      },
      maxSize: MAX_SIZE_FILE,
      onDropAccepted,
    });
  const handleRemoveImageFile = (filePath) => {
    let currentFiles = [...files];
    currentFiles = currentFiles.filter((item) => item.path !== filePath);
    setFiles(currentFiles);
  };

  return (
    <>
      <Box>
        <ContainerDropZone
          {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <Typography>
            Kéo và thả các file hình ảnh vào đây, hoặc click vào đây để chọn
            file
          </Typography>
          <Typography>
            Chỉ chấp nhận các file ảnh. Kích thước mỗi file không quá 10MB
          </Typography>
        </ContainerDropZone>
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          {files.length === 0 && (
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Danh sách các file hình ảnh đang trống
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {files.map((file) => (
              <div key={file.path}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
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
                      src={file.preview}
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
                      onClick={() => handleRemoveImageFile(file.path)}
                    >
                      <DeleteForeverIcon sx={{ color: "rgb(207, 55, 61)" }} />
                    </Box>
                  </div>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
