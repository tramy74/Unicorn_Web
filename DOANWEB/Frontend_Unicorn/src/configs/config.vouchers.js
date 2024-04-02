export const TYPE_VOUCHER_ITEM_DISPLAY = {
  FREE_SHIP: "free_ship",
  AMOUNT: "amount",
};

export const convertTypeVoucher = (type) => {
  switch (type) {
    case TYPE_VOUCHER_ITEM_DISPLAY.FREE_SHIP:
      return "Giảm phí ship";
    case TYPE_VOUCHER_ITEM_DISPLAY.AMOUNT:
      return "Giảm tổng tiền";
    default:
      return "";
  }
};
