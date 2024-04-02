"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div className="mx-auto flex justify-center pt-4 ">
        <div
          className="active:!border-b-3  group flex cursor-pointer items-center rounded-xl border-2 border-b-4 border-blue-950 bg-[#38AC8F] font-medium text-[#fff] drop-shadow-lg duration-150 hover:opacity-70 active:opacity-70"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <div className="px-3 py-2 capitalize">Try again</div>
        </div>
      </div>
    </div>
  );
}
