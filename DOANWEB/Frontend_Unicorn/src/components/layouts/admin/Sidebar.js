"use client";
import SidebarHome from "./SidebarHome";
import SidebarList from "./SidebarList";

export default function Sidebar() {
  return (
    <>
      <div className="admin-layout-navigation fixed -translate-x-full divide-y divide-gray-200 drop-shadow-xl  transition-transform duration-100  ease-linear md:!w-[25rem] md:translate-x-0">
        <SidebarHome />
        <SidebarList />
      </div>
    </>
  );
}
