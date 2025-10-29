import { Button, Empty, message, Modal, Space, Table } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import dayjs from 'dayjs';
import ModalDetailUser from './ModalSeenDetailUser';
import { useState } from 'react';
import userApi from '../../../apis/userService';

function ListUser({ users, setUsers, onSetUpgrade, isUserManagement = false }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalReject, setIsOpenModalReject] = useState(false);

  const handleSeenDetail = (record) => {
    setSelectedUser(record);
    setIsOpenModal(true);
  };
  const handleConfirm = async (user) => {
    try {
      await userApi.confirmUpgradeToProvider(user._id);
      message.success(
        `Đã xác nhận nâng cấp nhà cung cấp cho người dùng ${user.fullName}.`
      );
      const res = await userApi.getQuantityAccountAwaitConfirm();
      setUsers(res.usersUpgrade);
      onSetUpgrade(res.total);
      setIsOpenModal(false);
      setIsOpenModalConfirm(false);
    } catch (error) {
      message.error(
        error?.message || 'Xác nhận nâng cấp thất bại. Vui lòng thử lại.'
      );
    }
  };
  const handleShowIsOpenModalConfirm = (record) => {
    setSelectedUser(record);
    setIsOpenModalConfirm(true);
  };
  const handleShowIsOpenModalReject = (record) => {
    setSelectedUser(record);
    setIsOpenModalReject(true);
  };

  const handleReject = async (user) => {
    try {
      await userApi.rejectUpgradeToProvider(user._id);
      message.success(
        `Đã từ chối nâng cấp nhà cung cấp cho người dùng ${user.fullName}.`
      );
      const res = await userApi.getQuantityAccountAwaitConfirm();
      setUsers(res.usersUpgrade);
      onSetUpgrade(res.total);
      setIsOpenModal(false);
      setIsOpenModalReject(false);
    } catch (error) {
      message.error(
        error?.message || 'Từ chối nâng cấp thất bại. Vui lòng thử lại.'
      );
    }
  };
  const renderAction = (record) => {
    return (
      <>
        <Space>
          <Button
            size='small'
            color='primary'
            variant='solid'
            onClick={() => handleSeenDetail(record)}
          >
            Xem chi tiết
          </Button>
          {!isUserManagement && (
            <>
              <Button
                size='small'
                color='green'
                variant='solid'
                onClick={() => handleShowIsOpenModalConfirm(record)}
              >
                Chấp nhận
              </Button>
              <Button
                size='small'
                color='danger'
                variant='solid'
                onClick={() => handleShowIsOpenModalReject(record)}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      </>
    );
  };
  const renderRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'provider':
        return 'Nhà cung cấp';
      case 'user':
        return 'Người dùng';
      default:
        return '—';
    }
  };
  if (!users?.length) {
    return <Empty description={'Không có người dùng nào.'} />;
  }
  return (
    <>
      <Table
        dataSource={users}
        rowKey='_id'
        columns={[
          {
            title: 'STT',
            dataIndex: 'index',
            align: 'center',
            render: (_, __, index) => index + 1
          },
          {
            title: 'Tên người dùng',
            align: 'center',
            dataIndex: 'fullName',
            render: (value) => capitalizeName(value)
          },
          {
            title: 'Vai trò',
            align: 'center',
            dataIndex: 'role',
            render: (value) => renderRole(value)
          },
          {
            title: 'Số điện thoại',
            align: 'center',
            dataIndex: 'phone'
          },
          {
            title: 'Email',
            align: 'center',
            dataIndex: 'email'
          },
          {
            title: 'Ngày tạo tài khoản',
            align: 'center',
            dataIndex: 'registerDate',
            render: (value) => dayjs(value).format('DD-MM-YYYY'),
            sorter: (a, b) =>
              dayjs(a.registerDate).valueOf() - dayjs(b.registerDate).valueOf(),
            sortDirections: ['descend', 'ascend']
          },

          {
            title: 'Thao tác',
            align: 'center',
            render: (record) => renderAction(record)
          }
        ]}
        pagination={{ pageSize: 5 }}
      />
      <ModalDetailUser
        open={isOpenModal}
        onOk={() => handleConfirm(selectedUser)}
        onCancel={setIsOpenModal}
        user={selectedUser}
        isManage={isUserManagement}
      />

      <Modal
        title={'Xác nhận nâng cấp nhà cung cấp'}
        open={isOpenModalConfirm}
        onOk={() => handleConfirm(selectedUser)}
        onCancel={() => setIsOpenModalConfirm(false)}
        okText={'Xác nhận'}
        cancelText={'Đóng'}
      >
        <p>
          Xác nhận nâng cấp tài khoản nhà cung cấp cho người dùng{' '}
          {selectedUser ? selectedUser.fullName : ''}.
        </p>
      </Modal>

      <Modal
        title={'Xác nhận từ chối nâng cấp nhà cung cấp'}
        open={isOpenModalReject}
        onOk={() => handleReject(selectedUser)}
        onCancel={() => setIsOpenModalReject(false)}
        okText={'Xác nhận'}
        cancelText={'Đóng'}
      >
        <p>
          Xác nhận từ chối nâng cấp tài khoản nhà cung cấp cho người dùng{' '}
          {selectedUser ? selectedUser.fullName : ''}.
        </p>
      </Modal>
    </>
  );
}

export default ListUser;
