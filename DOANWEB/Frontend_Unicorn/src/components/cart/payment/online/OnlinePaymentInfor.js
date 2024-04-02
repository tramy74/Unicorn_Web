"use client";
import { ORDER_DELIVERY_STATUSES } from "@/configs/config.orders";
import { convertDateTime } from "@/utils/convertDate";
import { ConvertMoney } from "@/utils/convertMoney";
import { convertOrderDeliveryStatus } from "@/utils/convertOrders";

function OnlinePaymentInfor({ currentOrderPaymentPending }) {
  return (
    <>
      <div className="mx-auto w-full max-w-[60rem]">
        <h2 className="p-8 text-[2.5rem] font-bold">Thông tin thanh toán</h2>
        <div className="px-8 ">
          <div
            className="flex flex-col overflow-hidden "
            style={{
              width: "100%",
              border: ".1rem solid rgba(0, 0, 0, .125)",
              borderRadius: "1rem",
            }}
          >
            <div
              className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in"
              style={{
                borderTop: ".1rem solid rgba(0, 0, 0, .125)",
              }}
            >
              <div className="font-semibold">Mã đơn hàng:</div>
              <div> {currentOrderPaymentPending._id}</div>
            </div>
            <div
              className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in"
              style={{
                borderTop: ".1rem solid rgba(0, 0, 0, .125)",
              }}
            >
              <div className="font-semibold">Tổng tiền:</div>
              <ConvertMoney money={currentOrderPaymentPending.total} />
            </div>
            <div
              className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in"
              style={{
                borderTop: ".1rem solid rgba(0, 0, 0, .125)",
              }}
            >
              <div className="font-semibold">Tình trạng đơn hàng:</div>
              <div>
                {convertOrderDeliveryStatus(
                  currentOrderPaymentPending.order_status
                )}
              </div>
            </div>
            <div
              className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in"
              style={{
                borderTop: ".1rem solid rgba(0, 0, 0, .125)",
              }}
            >
              <div className="font-semibold">Thời gian tạo đơn hàng:</div>
              <div>{convertDateTime(currentOrderPaymentPending.createdAt)}</div>
            </div>
            {currentOrderPaymentPending.order_status ===
              ORDER_DELIVERY_STATUSES.PAYMENT_PENDING && (
              <>
                <div
                  className="flex items-center justify-between px-8 py-4 transition-all duration-150 ease-in"
                  style={{
                    borderTop: ".1rem solid rgba(0, 0, 0, .125)",
                  }}
                >
                  <div className="text-red-400">
                    Lưu ý: Nếu sau 10 phút kể từ khi được tạo, đơn hàng chưa
                    được thanh toán thì sẽ hủy đơn hàng
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlinePaymentInfor;
