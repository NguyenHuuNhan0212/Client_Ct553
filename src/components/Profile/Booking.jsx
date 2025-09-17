import { Card, Table } from 'antd';

function Booking() {
  const bookings = [
    { id: 1, service: 'Khách sạn ABC', status: 'Đã xác nhận', price: 1500000 },
    { id: 2, service: 'Khách sạn 1', status: 'Đã xác nhận', price: 1500000 },
    { id: 3, service: 'Khách sạn 2', status: 'Đã xác nhận', price: 1500000 },
    { id: 4, service: 'Khách sạn 3', status: 'Đã xác nhận', price: 1500000 },
    { id: 5, service: 'Khách sạn 5', status: 'Đã xác nhận', price: 1500000 },
    { id: 6, service: 'Khách sạn 6', status: 'Đã xác nhận', price: 1500000 },
    { id: 7, service: 'Tour Cần Thơ', status: 'Chờ xác nhận', price: 1200000 }
  ];
  return (
    <Card variant='borderless' style={{ borderRadius: 10, padding: 20 }}>
      <Table
        dataSource={bookings}
        rowKey='id'
        columns={[
          { title: 'Dịch vụ', dataIndex: 'service' },
          { title: 'Trạng thái', dataIndex: 'status' },
          {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            render: (val) => val.toLocaleString()
          }
        ]}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}

export default Booking;
