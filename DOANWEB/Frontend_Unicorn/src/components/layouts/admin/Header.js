"use client";
import { BellIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SidebarMobile from "./SidebarMobile";
import SidebarMobileButton from "./SidebarMobileButton";
const Header = () => {
  const [isOpenSidebarMobile, setIsOpenSidebarMobile] = useState(false);
  const handleToggleSidebarMobile = () => {
    setIsOpenSidebarMobile(!isOpenSidebarMobile);
  };
  return (
    <>
      <SidebarMobile
        isOpenSidebarMobile={isOpenSidebarMobile}
        handleToggleSidebarMobile={handleToggleSidebarMobile}
      />
      <div className="admin-layout-header  gap-4 drop-shadow-md ">
        <SidebarMobileButton
          isOpenSidebarMobile={isOpenSidebarMobile}
          handleToggleSidebarMobile={handleToggleSidebarMobile}
        />
        <SearchBar />
        <div className="admin-layout-account-notifi flex">
          <BellIcon className="h-[2rem] w-[2rem] text-[#38ac8f]" />
          <Image alt="" src="/avatar.png" width={30} height={30} />
        </div>
      </div>
    </>
  );
};
export default Header;
