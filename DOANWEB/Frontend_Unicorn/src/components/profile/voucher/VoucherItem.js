"use client";
import { TYPE_VOUCHER_ITEM_DISPLAY } from "@/configs/config.vouchers";
import { convertDateTime } from "@/utils/convertDate";
import { ConvertMoney } from "@/utils/convertMoney";
import { TicketIcon } from "@heroicons/react/24/outline";

export default function VoucherItem({ voucher, button }) {
  const handleRenderUITypeVoucher = () => {
    if (voucher.type === TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT) {
      return "tổng tiền";
    }
    if (voucher.type === TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP) {
      return "tiền ship";
    }
    return "";
  };
  const handleRenderUIVoucherDescription = () => {
    let description = voucher.description;
    if (voucher.min_order_quantity) {
      description += `. Từ ${voucher.min_order_quantity} sản phẩm trở lên`;
    }
    if (voucher.min_order_amount) {
      description += `. Tổng đơn từ ${(
        <ConvertMoney money={voucher.min_order_amount} />
      )} trở lên`;
    }
    return description;
  };

  return (
    <>
      <div className="voucher-item  !flex-col divide-gray-200 rounded-lg drop-shadow-xl md:!flex-row">
        <div className="voucher_image relative w-[100%] items-center justify-center rounded-l-lg border-r-[3px] border-dotted drop-shadow-xl before:absolute before:left-[-1rem] before:h-8 before:w-8 before:rounded-[50%] before:bg-[#eeeeee] before:content-[''] md:w-[13rem] ">
          <TicketIcon className="mx-auto h-[5rem] w-[5rem]" />
        </div>

        <div className="voucher-infomation gap-4">
          <div className="voucher-line flex-wrap gap-4">
            <div className="voucher-percent">
              Giảm {voucher.discount}% {handleRenderUITypeVoucher()}
            </div>
            <div className="voucher-id rounded-l border-2 border-dashed px-4 py-2 text-gray-400">
              {voucher.code}
            </div>
          </div>
          <div className="voucher-detail">
            {handleRenderUIVoucherDescription()}
          </div>
          <div className="voucher-line flex-wrap gap-4">
            <div className="voucher-expired">
              Hết hạn sau: {convertDateTime(voucher.expired_date)}
            </div>
            <div className="flex gap-4">{button}</div>
          </div>
        </div>
      </div>
    </>
  );
}
