"use client";
import { QueueListIcon } from "@heroicons/react/24/outline";

export default function SidebarMobileButton({
  handleToggleSidebarMobile,
  isOpenSidebarMobile,
}) {
  return (
    <>
      <div
        className="cursor-pointer rounded-[1rem] bg-[#cbf9ed] p-4 md:hidden"
        onClick={handleToggleSidebarMobile}
      >
        <QueueListIcon className="h-[2.5rem] w-[2.5rem] font-semibold text-[#38ac8f]" />
      </div>
    </>
  );
}
