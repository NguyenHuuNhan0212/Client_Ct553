import { Modal } from 'antd';

function ModalDetailUser({ open, onOk, onCancel, user }) {
  return (
    <Modal
      title={`Chi tiết người dùng ${user?.fullName}`}
      open={open}
      onCancel={() => onCancel(false)}
      onOk={onOk}
      footer={user?.isApprove ? false : undefined}
      okText='Xác nhận'
      cancelText='Đóng'
    >
      <p>Xem chi tiết {user?.fullName}</p>
    </Modal>
  );
}

export default ModalDetailUser;
