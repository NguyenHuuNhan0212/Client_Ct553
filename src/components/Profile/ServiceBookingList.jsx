import { Card, Table, Tag, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllForSupplier } from '../../redux/slices/bookingSlice';
import dayjs from 'dayjs';
const { Title } = Typography;
function BookingList() {
  const dispatch = useDispatch();
  const { bookingsOfSupplier } = useSelector((state) => state.booking);

  const renderContent = (record) => {
    if (
      record.paymentMethod === 'offline' &&
      record.paymentStatus === 'pending'
    ) {
      return <Tag color='red'>Chưa thanh toán</Tag>;
    } else if (
      record.paymentMethod === 'online' &&
      record.paymentStatus === 'success' &&
      record.status === 'confirmed'
    ) {
      return <Tag color='green'>Đã thanh toán</Tag>;
    } else if (
      record.paymentMethod === 'online' &&
      record.paymentStatus === 'success' &&
      record.status === 'paid'
    ) {
      return <Tag color='green'>Thanh toán một phần</Tag>;
    } else if (record.paymentStatus === 'refunded') {
      return <Tag color='cyan'>Đã hoàn tiền</Tag>;
    } else {
      return <Tag color='red'>Đã hủy</Tag>;
    }
  };
  const columns = [
    { title: 'Địa điểm', dataIndex: ['placeId', 'name'], key: 'placeName' },
    { title: 'Khách hàng', dataIndex: ['userId', 'fullName'], key: 'customer' },
    {
      title: 'Loại đơn đặt',
      key: 'bookingType',
      render: (record) => {
        if (!record.bookingDetails || record.bookingDetails.length === 0)
          return 'Không có dữ liệu';

        return (
          <>
            {record.bookingDetails.map((item, index) => {
              let type = '';
              if (item.roomTypeId) type = 'Phòng';
              if (item.serviceId) type = 'Dịch vụ';

              return (
                <div key={index}>
                  <strong>
                    {type}:{' '}
                    {item.serviceId ? item.serviceName : item.roomTypeName}
                  </strong>{' '}
                  — SL: {item.quantity} — Giá:{' '}
                  {item.priceAtBooking.toLocaleString()}₫
                </div>
              );
            })}
          </>
        );
      }
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'bookingDate',
      render: (createdAt) => dayjs(createdAt).format('DD-MM-YYYY')
    },
    {
      title: 'Ngày check in',
      dataIndex: 'checkInDate',
      key: 'checkIn',
      render: (checkInDate) => dayjs(checkInDate).format('DD-MM-YYYY')
    },
    {
      title: 'Trạng thái thanh toán',
      key: 'status',
      render: (record) => {
        return renderContent(record);
      }
    }
  ];
  useEffect(() => {
    dispatch(getAllForSupplier());
  }, [dispatch]);
  return (
    <Card
      variant='borderless'
      style={{ borderRadius: 10, padding: 20 }}
      title={
        <Title level={1} style={{ textAlign: 'center' }}>
          Danh sách đặt dịch vụ
        </Title>
      }
    >
      <Table
        dataSource={bookingsOfSupplier}
        columns={columns}
        pagination={{ pageSize: 7 }}
      />
    </Card>
  );
}

export default BookingList;
