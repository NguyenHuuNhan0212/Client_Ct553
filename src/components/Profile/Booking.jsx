import { Card, Table, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
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
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (value) =>
              value === 'pending' ? (
                <Tag icon={<SyncOutlined spin />} color='processing'>
                  Đang xử lý
                </Tag>
              ) : value === 'success' ? (
                <Tag icon={<CheckCircleOutlined />} color='success'>
                  Thành công
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color='error'>
                  Đã hủy
                </Tag>
              )
          },
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
