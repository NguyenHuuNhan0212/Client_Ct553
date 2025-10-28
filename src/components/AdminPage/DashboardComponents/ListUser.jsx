import { Button, Empty, Space, Table } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import dayjs from 'dayjs';

function ListUser({ users }) {
  const renderAction = (record) => {
    return (
      <>
        <Space>
          <Button size='small' color='primary' variant='solid'>
            Xem chi tiết
          </Button>

          <Button size='small' color='green' variant='solid'>
            Chấp nhận
          </Button>
          <Button size='small' color='danger' variant='solid'>
            Từ chối
          </Button>
        </Space>
      </>
    );
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
            title: 'Ngày đăng ký nâng cấp',
            align: 'center',
            dataIndex: 'upgradeDate',
            render: (value) => dayjs(value).format('DD-MM-YYYY'),
            sorter: (a, b) =>
              dayjs(a.upgradeDate).valueOf() - dayjs(b.upgradeDate).valueOf(),
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
    </>
  );
}

export default ListUser;
