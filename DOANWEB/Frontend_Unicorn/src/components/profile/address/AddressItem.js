"use client";

const AddressItem = ({ address, buttons }) => {
  const INFORMATION_CONTENT = [
    {
      title: "Họ và tên:",
      value: address?.full_name,
    },
    {
      title: "Địa chỉ:",
      value: `${address?.detail_address}, ${address?.district}, ${address?.ward},
      ${address?.provine}`,
    },
    {
      title: "Số điện thoại:",
      value: address?.phone_number,
    },
  ];
  return (
    <>
      <div className="address-item flex-col md:flex-row">
        <div className="flex w-full flex-col">
          {INFORMATION_CONTENT.map((item) => (
            <div key={item.title} className="flex flex-col sm:flex-row">
              <span className="user-title-item min-w-[15rem] sm:max-w-[15rem] ">
                {item.title}
              </span>
              <span className="user-desc-value-item sm:max-w-[calc(100%-15rem)] ">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        {buttons}
      </div>
    </>
  );
};

export default AddressItem;
