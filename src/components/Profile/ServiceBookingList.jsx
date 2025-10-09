import {
  Button,
  Card,
  Descriptions,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllForSupplier } from '../../redux/slices/bookingSlice';
import dayjs from 'dayjs';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import bookingApi from '../../apis/bookingService';
const { Title, Text } = Typography;
function BookingList() {
  const dispatch = useDispatch();
  const { bookingsOfSupplier } = useSelector((state) => state.booking);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmPaymentModal, setIsOpenConfirmPaymentModal] =
    useState(false);
  const renderContent = (record) => {
    if (
      record.paymentMethod === 'offline' &&
      record.paymentStatus === 'pending'
    ) {
      return <Tag color='gold'>Chưa thanh toán</Tag>;
    } else if (
      record.paymentMethod === 'online' &&
      record.paymentStatus === 'success' &&
      record.status === 'confirmed'
    ) {
      return <Tag color='green'>Đã thanh toán</Tag>;
    } else if (
      record.paymentMethod === 'offline' &&
      record.paymentStatus === 'success' &&
      record.status === 'confirmed'
    ) {
      return <Tag color='green'>Đã thanh toán</Tag>;
    } else if (
      record.paymentMethod === 'online' &&
      record.paymentStatus === 'success' &&
      record.status === 'paid'
    ) {
      return <Tag color='blue'>Thanh toán một phần</Tag>;
    } else if (record.paymentStatus === 'refunded') {
      return <Tag color='cyan'>Đã hủy và hoàn tiền</Tag>;
    } else {
      return <Tag color='red'>Đã hủy</Tag>;
    }
  };

  const handleShowModal = (record) => {
    setIsOpenModal(true);
    setSelectedBooking(record);
  };
  const handleShowModalDelete = (record) => {
    setSelectedBooking(record);
    setIsOpenDeleteModal(true);
  };
  const handleShowModalConfirmPayment = (record) => {
    setIsOpenConfirmPaymentModal(true);
    setSelectedBooking(record);
  };
  const handleConfirmPayment = async () => {
    if (!selectedBooking) {
      return;
    }
    try {
      await bookingApi.confirmPayment(selectedBooking._id);
      await dispatch(getAllForSupplier()).unwrap();
      setIsOpenConfirmPaymentModal(false);
      message.success('Cập nhật thanh toán thành công');
    } catch (err) {
      setIsOpenConfirmPaymentModal(false);
      message.error(err.response?.data);
    }
  };
  const handleRemovePlace = async () => {
    if (!selectedBooking) return;
    try {
      await bookingApi.deleteBookingForSupplier(selectedBooking._id);
      await dispatch(getAllForSupplier()).unwrap();
      message.success('Đã xóa đơn đặt thành công');
      setIsOpenDeleteModal(false);
    } catch (err) {
      setIsOpenDeleteModal(false);
      message.error(err.response?.data || 'Xóa đơn đặt thất bại');
    }
  };
  const columns = [
    {
      title: 'Địa điểm',
      align: 'center',
      dataIndex: ['placeId', 'name'],
      key: 'placeName'
    },
    {
      title: 'Khách hàng',
      align: 'center',
      dataIndex: ['userId', 'fullName'],
      key: 'customer'
    },
    {
      title: 'Loại đơn đặt',
      align: 'center',
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
                <div key={index} style={{ textAlign: 'left' }}>
                  <strong>
                    {type}:{' '}
                    {item.serviceId ? item.serviceName : item.roomTypeName}
                  </strong>{' '}
                  — SL: {item.quantity} — Giá:{' '}
                  {item.priceAtBooking.toLocaleString()} VNĐ
                </div>
              );
            })}
          </>
        );
      }
    },
    {
      title: `Ngày đặt dịch vụ  `,
      align: 'center',
      dataIndex: 'createdAt',
      key: 'bookingDate',
      render: (createdAt) => dayjs(createdAt).format('DD-MM-YYYY')
    },
    {
      title: 'Ngày check in',
      align: 'center',
      dataIndex: 'checkInDate',
      key: 'checkIn',
      render: (checkInDate) => dayjs(checkInDate).format('DD-MM-YYYY')
    },
    {
      title: 'Trạng thái thanh toán',
      align: 'center',
      key: 'status',
      render: (record) => {
        return renderContent(record);
      }
    },
    {
      title: 'Thao tác',
      align: 'center',
      key: 'status',
      render: (_, record) => (
        <Space size='large' style={{ fontSize: 20 }}>
          <Tooltip title={'Xem chi tiết đơn đặt'}>
            <EyeOutlined
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => handleShowModal(record)}
            />
          </Tooltip>

          {record.isDeleted && (
            <Tooltip title={'Xóa đơn đặt'}>
              <DeleteOutlined
                style={{ color: '#ff4d4f', cursor: 'pointer' }}
                onClick={() => handleShowModalDelete(record)}
              />
            </Tooltip>
          )}
          {Number(record.totalPrice) !== Number(record.paymentAmount) && (
            <Tooltip title={'Xác nhận đã thu tiền đầy đủ'}>
              <Button
                color='cyan'
                variant='filled'
                onClick={() => handleShowModalConfirmPayment(record)}
              >
                <CheckCircleOutlined /> Đã thu tiền
              </Button>
            </Tooltip>
          )}
        </Space>
      )
    }
  ];
  useEffect(() => {
    dispatch(getAllForSupplier());
  }, [dispatch]);
  return (
    <>
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
          rowKey='_id'
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={
          <Title level={3} style={{ textAlign: 'center' }}>
            Chi tiết đơn đặt dịch vụ
          </Title>
        }
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
        width={800}
      >
        {selectedBooking && (
          <>
            <Descriptions title='Thông tin khách hàng' bordered column={1}>
              <Descriptions.Item label='Họ tên'>
                {selectedBooking?.userId?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {selectedBooking?.userId?.email}
              </Descriptions.Item>
              <Descriptions.Item label='SĐT'>
                {selectedBooking?.userId?.phone || '—'}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title='Thông tin đơn đặt'
              bordered
              column={1}
              style={{ marginTop: 20 }}
            >
              <Descriptions.Item label='Địa điểm'>
                {selectedBooking?.placeId?.name}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày đặt'>
                {dayjs(selectedBooking?.createdAt).format('DD-MM-YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày check-in'>
                {dayjs(selectedBooking?.checkInDate).format('DD-MM-YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label='Trạng thái'>
                {renderContent(selectedBooking)}
              </Descriptions.Item>
              <Descriptions.Item label='Phương thức thanh toán'>
                {selectedBooking?.paymentMethod === 'online' ? (
                  <span style={{ color: 'blueviolet', fontWeight: 500 }}>
                    Online
                  </span>
                ) : (
                  <span style={{ color: 'blueviolet', fontWeight: 500 }}>
                    Tại chỗ
                  </span>
                )}
              </Descriptions.Item>
            </Descriptions>

            <Table
              style={{ marginTop: 20 }}
              rowKey={
                selectedBooking?.bookingDetails?.serviceId ||
                selectedBooking?.bookingDetails?.roomTypeId
              }
              dataSource={selectedBooking?.bookingDetails || []}
              pagination={false}
              size='small'
              columns={[
                {
                  title: 'Loại',
                  key: 'type',
                  render: (item) => (item.serviceId ? 'Dịch vụ' : 'Phòng')
                },
                {
                  title: 'Tên',
                  key: 'name',
                  render: (item) =>
                    item.serviceId ? item.serviceName : item.roomTypeName
                },
                { title: 'Số lượng', dataIndex: 'quantity', align: 'center' },
                {
                  title: 'Giá (VNĐ)',
                  dataIndex: 'priceAtBooking',
                  render: (price) => `${price.toLocaleString()} VNĐ`
                }
              ]}
            />

            <Descriptions
              title='Thông tin thanh toán'
              bordered
              column={1}
              style={{ marginTop: 20 }}
            >
              <Descriptions.Item
                label='Tổng tiền'
                style={{ color: '#ff4d4f', fontWeight: 700 }}
              >
                {selectedBooking?.totalPrice.toLocaleString()} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                label='Số tiền đã thanh toán'
                style={{ color: '#52c41a', fontWeight: 700 }}
              >
                {selectedBooking?.paymentAmount.toLocaleString()} VNĐ
              </Descriptions.Item>
              <Descriptions.Item
                label='Số tiền cần thanh toán thêm'
                style={{ color: '#faad14', fontWeight: 700 }}
              >
                {(
                  Number(selectedBooking?.totalPrice) -
                  Number(selectedBooking?.paymentAmount)
                ).toLocaleString()}{' '}
                VNĐ
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>

      <Modal
        title='Xác nhận xóa đơn đặt'
        open={isOpenDeleteModal}
        onOk={handleRemovePlace}
        onCancel={() => setIsOpenDeleteModal(false)}
        okText={'Xác nhận xóa'}
        cancelText={'Hủy'}
      >
        <p>Bạn chắc chắn muốn xóa đơn đặt này!!!</p>
      </Modal>

      <Modal
        title='Xác nhận thanh toán đầy đủ'
        open={isOpenConfirmPaymentModal}
        onOk={handleConfirmPayment}
        onCancel={() => setIsOpenConfirmPaymentModal(false)}
        okText={'Xác nhận đã thanh toán đủ'}
        cancelText={'Hủy'}
      >
        <p>
          Bạn có chắc chắn muốn xác nhận đã thu tiền đầy đủ cho đơn đặt này
          không?
        </p>
      </Modal>
    </>
  );
}

export default BookingList;
