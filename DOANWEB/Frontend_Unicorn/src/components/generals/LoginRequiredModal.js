import Link from "next/link";
import Modal, { ModalBody, ModalTitle } from "./Modal";

const LoginRequiredModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalTitle>Thông báo</ModalTitle>
      <ModalBody>
        <div className="mt-2">
          <p className="text-base text-gray-500">
            Vui lòng đăng nhập. Chức năng này chỉ dành cho thành viên
          </p>
        </div>

        <div className="mt-4">
          <Link href="/sign-in">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-base font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Đăng nhập
            </button>
          </Link>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default LoginRequiredModal;
