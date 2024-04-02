"use client";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import SidebarHome from "./SidebarHome";
import SidebarList from "./SidebarList";

export default function SidebarMobile({
  handleToggleSidebarMobile,
  isOpenSidebarMobile,
}) {
  return (
    <>
      <Transition appear show={isOpenSidebarMobile}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#12111157]"
            onClick={handleToggleSidebarMobile}
          ></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-100 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-100 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="admin-layout-navigation fixed left-0 z-[1001] !w-[25rem] divide-y divide-gray-200  drop-shadow-xl transition-transform  duration-100 ease-linear">
            <SidebarHome />
            <SidebarList />
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
}
