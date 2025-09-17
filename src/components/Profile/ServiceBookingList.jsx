import { Card, Table, Tag } from 'antd';

function RoomBookingList() {
  // Dữ liệu mẫu (bạn thay bằng API thực tế)
  const bookings = [
    {
      id: 101,
      customer: 'Nguyễn Văn A',
      roomType: 'Phòng đơn',
      checkIn: '2025-09-18',
      checkOut: '2025-09-20',
      status: 'Đang xử lý'
    },
    {
      id: 102,
      customer: 'Trần Thị B',
      roomType: 'Phòng đôi',
      checkIn: '2025-09-15',
      checkOut: '2025-09-17',
      status: 'Đã xác nhận'
    },
    {
      id: 103,
      customer: 'Lê Văn C',
      roomType: 'Phòng VIP',
      checkIn: '2025-09-10',
      checkOut: '2025-09-12',
      status: 'Đã hủy'
    }
  ];

  const columns = [
    { title: 'Mã đặt phòng', dataIndex: 'id', key: 'id' },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Loại phòng', dataIndex: 'roomType', key: 'roomType' },
    { title: 'Ngày nhận phòng', dataIndex: 'checkIn', key: 'checkIn' },
    { title: 'Ngày trả phòng', dataIndex: 'checkOut', key: 'checkOut' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'Đã xác nhận') color = 'green';
        else if (status === 'Đã hủy') color = 'red';
        else if (status === 'Đang xử lý') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  return (
    <Card variant='borderless' style={{ borderRadius: 10, padding: 20 }}>
      <Table
        dataSource={bookings}
        rowKey='id'
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}

export default RoomBookingList;
