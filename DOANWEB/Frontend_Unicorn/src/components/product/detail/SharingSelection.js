"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import FacebookIcon from "@mui/icons-material/Facebook";

import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

import { FacebookShareButton, TwitterShareButton } from "react-share";
const SHARING_PLATFORM = [
  { title: "Facebook", icon: <FacebookIcon /> },
  { title: "Twitter", icon: <TwitterIcon /> },
];

export default function SharingSelection({ item }) {
  const pathname = usePathname();

  console.log(process.env.NEXTAUTH_URL + pathname);
  return (
    <div className="w-full pt-[1.5rem]">
      <div className="w-full rounded-2xl bg-white p-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-[2rem] font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className={open && "font-semibold"}> Chia sẻ</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className="px-4 pb-2 pt-4 text-base text-gray-500"
                  static
                >
                  <Box
                    sx={{
                      padding: "1.5rem 0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <FacebookShareButton
                        url={process.env.NEXTAUTH_URL + pathname}
                      >
                        <FacebookIcon
                          sx={{
                            fontSize: "3rem",
                          }}
                        />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={process.env.NEXTAUTH_URL + pathname}
                      >
                        <TwitterIcon
                          sx={{
                            fontSize: "3rem",
                          }}
                        />
                      </TwitterShareButton>
                    </Box>
                  </Box>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
