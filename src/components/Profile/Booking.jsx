import { Card, Table, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../redux/slices/bookingSlice';
const { Title } = Typography;
function Booking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  return (
    <Card
      variant='borderless'
      title={
        <Title level={1} style={{ textAlign: 'center' }}>
          Lịch sử đơn đặt dịch vụ
        </Title>
      }
      style={{ borderRadius: 10, padding: 20 }}
    >
      <Table
        dataSource={bookings}
        rowKey='_id'
        columns={[
          { title: 'Tên địa điểm', dataIndex: 'placeName' },
          { title: 'Loại dịch vụ', dataIndex: 'serviceName' },
          { title: 'Trạng thái', dataIndex: 'status' },
          {
            title: 'Giá (VNĐ)',
            dataIndex: 'totalPrice',
            render: (val) => val.toLocaleString()
          }
        ]}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}

export default Booking;
