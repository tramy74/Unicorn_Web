import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import AddressForm from "@/components/profile/address/AddressForm";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { TYPE_ADDRESS_FORM } from "@/configs/config.users.address";

export const metadata = {
  title: "Thêm địa chỉ mới",
};
export default function AddNewAddress() {
  const addressInformation = {
    fullName: "",
    phoneNumber: "",
    detailAddrress: "",
    provine: "",
    district: "",
    ward: "",
    default: false,
    addressId: "",
  };
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Địa chỉ",
      link: `${ROUTERS_PATH.PROFILE}/address`,
    },
    {
      title: "Thêm mới",
      link: `${ROUTERS_PATH.PROFILE}/address/new`,
    },
  ];

  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>

      <div className="user-desc-container divide-y divide-gray-200 rounded-lg shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Thêm địa chỉ</h2>
        </div>
        <div className="user-desc-body ">
          <AddressForm
            type={TYPE_ADDRESS_FORM.ADD}
            addressInformation={addressInformation}
          />
        </div>
      </div>
    </>
  );
}
