import { Descriptions, Divider, Modal } from 'antd';
import dayjs from 'dayjs';

function ModalDetailUser({ open, onOk, onCancel, user, isManage }) {
  return (
    <Modal
      title={`Chi tiết người dùng ${user?.fullName}`}
      open={open}
      onCancel={() => onCancel(false)}
      onOk={onOk}
      footer={user?.isApprove || isManage ? false : undefined}
      okText='Xác nhận'
      cancelText='Đóng'
    >
      <Descriptions
        bordered
        size='middle'
        column={1}
        labelStyle={{ fontWeight: 600, width: '40%' }}
      >
        <Descriptions.Item label='Họ và tên'>
          {user?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label='Email'>{user?.email}</Descriptions.Item>
        <Descriptions.Item label='Số điện thoại'>
          {user?.phone || '—'}
        </Descriptions.Item>
        <Descriptions.Item label='Vai trò'>
          {user?.role === 'user'
            ? 'Người dùng'
            : user?.role === 'provider'
            ? 'Nhà cung cấp'
            : '—'}
        </Descriptions.Item>
        <Descriptions.Item label='Ngày tạo tài khoản'>
          {dayjs(user?.registerDate).format('DD/MM/YYYY HH:mm')}
        </Descriptions.Item>
      </Descriptions>

      {(!isManage || user?.isProviderApproved) && (
        <>
          <Divider> Thông tin nhà cung cấp</Divider>
          <Descriptions
            bordered
            size='middle'
            column={1}
            labelStyle={{ fontWeight: 600, width: '40%' }}
          >
            <Descriptions.Item label='Ngày đăng ký tài khoản nhà cung cấp'>
              {dayjs(user?.upgradeDate).format('DD/MM/YYYY HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label='Số thẻ đăng ký'>
              {user?.cardNumber || '—'}
            </Descriptions.Item>
            <Descriptions.Item label='Tên chủ thẻ'>
              {user?.cardHolderName || '—'}
            </Descriptions.Item>
            <Descriptions.Item label='Số tài khoản ngân hàng'>
              {user?.bankAccount || '—'}
            </Descriptions.Item>
            <Descriptions.Item label='Tên ngân hàng'>
              {user?.bankName || '—'}
            </Descriptions.Item>{' '}
          </Descriptions>
        </>
      )}
    </Modal>
  );
}

export default ModalDetailUser;
