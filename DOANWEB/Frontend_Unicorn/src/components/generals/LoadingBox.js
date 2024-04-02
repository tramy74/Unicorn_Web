"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Box, CircularProgress } from "@mui/material";
import { Fragment } from "react";
import { SpinningCircles } from "react-loading-icons";
import { useSelector } from "react-redux";

import { Backdrop, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Bars } from "react-loading-icons";
export const ModalTitle = ({ children }) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-center text-2xl font-bold text-gray-900"
    >
      {children}
    </Dialog.Title>
  );
};
export const ModalBody = ({ children }) => {
  return <Dialog.Description as="div">{children}</Dialog.Description>;
};

const LoadingBoxDesktop = ({ isLoading }) => {
  function closeModal() {
    return;
  }

  return (
    <>
      <Transition appear show={isLoading} as={Fragment}>
        <Dialog as="div" className="relative z-[1101]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[30rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ModalTitle>Đang tải</ModalTitle>
                  <ModalBody>
                    <div className="mt-2">
                      <div className="text-center ">
                        <SpinningCircles
                          className="mx-auto "
                          fill={"#38AC8F"}
                          width={50}
                          height={50}
                          speed={2}
                        />
                      </div>
                      <p className="text-base text-gray-500">
                        Đang thực thi dữ liệu, vui lòng đợi quá trình kết
                        thúc...
                      </p>
                    </div>
                  </ModalBody>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const LoadingBoxMobile = ({ isLoading }) => {
  const BoxLoading = styled(Box)({
    borderRadius: "20px",
    backgroundColor: "#fff",
    color: "black",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const LoadingContent = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <BoxLoading>
          <Bars fill="#38ac8f" width={50} height={50} speed={0.75} />
          <LoadingContent>Đang tải...</LoadingContent>
        </BoxLoading>
      </Backdrop>
    </>
  );
};

const LoadingBox = () => {
  const { isLoading } = useSelector((state) => state.loadingBox);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  switch (matches) {
    case true:
      return <LoadingBoxDesktop isLoading={isLoading} />;
    case false:
      return <LoadingBoxMobile isLoading={isLoading} />;
    default:
      return;
  }
};
export default LoadingBox;

export const LoadingContent = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};
