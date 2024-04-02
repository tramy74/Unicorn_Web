"use client";
import PaymentProductItem from "./PaymentProductItem";

function PaymentProduct({ listOrderItems = [] }) {
  return (
    <>
      <h2
        className="text-[2.5rem] font-bold"
        style={{
          padding: "2rem",
          borderBottom: ".1rem solid rgba(0, 0, 0, .125)",
          backgroundColor: "#EEEEEE",
        }}
      >
        Sản phẩm
      </h2>

      <div
        className="flex flex-col"
        style={{
          overflowY: "auto",
          maxHeight: "80rem",
          marginTop: 0,
        }}
      >
        {listOrderItems.map((item) => {
          return <PaymentProductItem item={item} key={item._id} />;
        })}
      </div>
    </>
  );
}

export default PaymentProduct;
