import { Modal } from 'antd';

function ModalApprove({ open, onOk, onCancel, place }) {
  return (
    <Modal
      title={`Kiểm duyệt địa điểm ${place?.name}`}
      open={open}
      onCancel={() => onCancel(false)}
      onOk={onOk}
      footer={place?.isApprove ? false : true}
      okText='Phê duyệt'
      cancelText='Đóng'
    >
      modal xem chi tiết {place?.name}
    </Modal>
  );
}

export default ModalApprove;
