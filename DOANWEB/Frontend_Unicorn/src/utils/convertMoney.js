import { NumericFormat } from "react-number-format";

export const ConvertMoney = ({ money }) => {
  return (
    <NumericFormat
      value={money}
      displayType="text"
      allowLeadingZeros
      thousandSeparator=","
      suffix=" đ"
    />
  );
};
