import {
  ORDER_DELIVERY_STATUSES,
  ORDER_PAYMENT_METHODS,
} from "@/configs/config.orders";

export const convertStatus = (status, content) => {
  switch (status) {
    case true:
      return (
        <div className="rounded-[0.8rem] bg-[#e7f9ed] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#33d067]">
          {content}
        </div>
      );
    case false:
      return (
        <div className="rounded-[0.8rem] bg-[#ffe9e5] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#ff984e]">
          {content}
        </div>
      );
    default:
      return "";
  }
};
export const convertOrderStatus = (status, content) => {
  switch (status) {
    case ORDER_DELIVERY_STATUSES.PENDING:
      return (
        <div className="rounded-[0.8rem] bg-[#FFF8E5] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#FFCD4E]">
          {content}
        </div>
      );
    case ORDER_DELIVERY_STATUSES.PAYMENT_PENDING:
      return (
        <div className="rounded-[0.8rem] bg-[#FFF8E5] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#FFCD4E]">
          {content}
        </div>
      );
    case ORDER_DELIVERY_STATUSES.DELIVERING:
      return (
        <div className="rounded-[0.8rem] bg-[#DBF0FE] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#4E97FD]">
          {content}
        </div>
      );
    case ORDER_DELIVERY_STATUSES.DELIVERED:
      return (
        <div className="rounded-[0.8rem] bg-[#E7F9ED] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#33d067]">
          {content}
        </div>
      );
    case ORDER_DELIVERY_STATUSES.CANCELLED:
      return (
        <div className="rounded-[0.8rem] bg-[#ffe9e5] px-[1.2rem] py-[0.3rem] text-center text-[1.5rem] font-medium text-[#ff984e]">
          {content}
        </div>
      );
    default:
      return "";
  }
};

export const convertOrderPaymentMethod = (method) => {
  switch (method) {
    case ORDER_PAYMENT_METHODS.CASH:
      return "Tiền mặt";
    case ORDER_PAYMENT_METHODS.BANKING:
      return "Chuyển khoản";

    default:
      return "";
  }
};
