import {
  Card,
  Table,
  Tag,
  Typography,
  Modal,
  Descriptions,
  List,
  Divider,
  Space,
  message,
  Tooltip,
  Select
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingDetail, getBookings } from '../../redux/slices/bookingSlice';
import bookingApi from '../../apis/bookingService';
import CancelPolicy from './BookingComponents/CancelPolicy';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
const { Title, Text } = Typography;

function Booking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentBooking } = useSelector((state) => state.booking);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [conditionFiltered, setConditionFiltered] = useState('new');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCancel, setOpenModalCancel] = useState(false);

  const filteredBookings =
    conditionFiltered === 'new' ? bookings : [...bookings].reverse();
  const showDetail = (record) => {
    dispatch(getBookingDetail(record._id));
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const showModalDelete = (record) => {
    setOpenModalDelete(true);
    setSelectedBooking(record);
  };
  const showModalCancel = (record) => {
    setOpenModalCancel(true);
    setSelectedBooking(record);
  };
  const handleChangeOption = (value) => {
    setConditionFiltered(value);
  };
  const handleDelete = async () => {
    if (!selectedBooking) return;
    try {
      await bookingApi.deleteBooking(selectedBooking._id);
      await dispatch(getBookings()).unwrap();
      setOpenModalDelete(false);
      message.success(`Đã xóa đơn đặt thành công`);
    } catch (err) {
      setOpenModalDelete(false);
      message.error(err?.response?.data?.message);
    }
  };
  const handleCancel = async () => {
    if (!selectedBooking) return;
    console.log(selectedBooking);
    try {
      await bookingApi.cancelBooking(selectedBooking._id);
      await dispatch(getBookings()).unwrap();
      setOpenModalCancel(false);
      message.success(`Đã hủy đơn đặt thành công`);
    } catch (err) {
      setOpenModalCancel(false);
      message.error(err?.response?.data?.message);
    }
  };
  const renderContentUsedService = (record) => {
    const { checkInDate, checkOutDate, status, totalPrice, paymentInfo } =
      record;
    const today = dayjs();
    const amount = paymentInfo?.amount || 0;

    if (status === 'cancelled') {
      return <Tag color='orange'>Không sử dụng dịch vụ</Tag>;
    }

    if (today.isAfter(dayjs(checkOutDate), 'day')) {
      if (Number(totalPrice) === Number(amount)) {
        return <Tag color='green'>Đã sử dụng dịch vụ</Tag>;
      } else {
        return <Tag color='red'>Không đến địa điểm</Tag>;
      }
    }

    const daysLeft = dayjs(checkInDate).diff(today, 'day') + 1;
    if (
      daysLeft > 0 &&
      !today.isBetween(dayjs(checkInDate), dayjs(checkOutDate), 'day', '[]')
    ) {
      return <Tag color='purple'>{daysLeft} ngày đếm ngược</Tag>;
    }

    if (today.isBetween(dayjs(checkInDate), dayjs(checkOutDate), 'day', '[]')) {
      return <Tag color='processing'>Đang sử dụng dịch vụ</Tag>;
    }
    return <Tag color='default'>Đang chờ xác định</Tag>;
  };

  const columns = [
    { title: 'Tên địa điểm', align: 'center', dataIndex: 'placeName' },
    { title: 'Loại địa điểm', align: 'center', dataIndex: 'serviceName' },
    {
      title: 'Ngày đặt dịch vụ',
      align: 'center',
      dataIndex: 'createdAt',
      render: (value) => {
        const date = new Date(value);
        return dayjs(date).format('HH:mm:ss DD-MM-YYYY');
      }
    },
    {
      title: 'Trạng thái đơn đặt',
      align: 'center',
      dataIndex: 'status',
      render: (value) =>
        value === 'pending' ? (
          <Tag icon={<SyncOutlined spin />} color='processing'>
            Đang xử lý
          </Tag>
        ) : value === 'confirmed' ? (
          <Tag icon={<CheckCircleOutlined />} color='success'>
            Thành công
          </Tag>
        ) : value === 'paid' ? (
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
      title: 'Sử dụng dịch vụ',
      align: 'center',
      render: (_, record) => renderContentUsedService(record)
    },
    {
      title: 'Giá (VNĐ)',
      align: 'center',
      dataIndex: 'totalPrice',
      render: (val) => val?.toLocaleString() || '—'
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Space size='large' style={{ fontSize: 20 }}>
          <Tooltip title={'Xem chi tiết đơn đặt'}>
            <EyeOutlined
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => showDetail(record)}
            />
          </Tooltip>

          {record.status !== 'cancelled' &&
            dayjs().isBefore(dayjs(record.checkInDate), 'day') && (
              <Tooltip title={'Hủy đơn đặt'}>
                <CloseCircleOutlined
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => showModalCancel(record)}
                />
              </Tooltip>
            )}

          {record.status === 'cancelled' && (
            <Tooltip title={'Xóa đơn đặt'}>
              <DeleteOutlined
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => showModalDelete(record)}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  return (
    <>
      <Card
        variant='borderless'
        title={
          <Title level={1} style={{ textAlign: 'center', marginBottom: 0 }}>
            Lịch sử đơn đặt dịch vụ
          </Title>
        }
        style={{ borderRadius: 10, padding: 20, background: '#fafafa' }}
      >
        <div style={{ textAlign: 'right' }}>
          <Select
            defaultValue='new'
            style={{ width: 100 }}
            onChange={handleChangeOption}
            options={[
              { value: 'new', label: 'Mới nhất' },
              { value: 'old', label: 'Cũ nhất' }
            ]}
          />
        </div>

        <Table
          dataSource={filteredBookings}
          rowKey='_id'
          columns={columns}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
        />
      </Card>
      <CancelPolicy />

      {/* Modal hiển thị chi tiết */}
      <Modal
        open={isModalVisible}
        onCancel={handleClose}
        title={<Divider style={{ fontSize: 20 }}>Chi tiết đơn đặt</Divider>}
        footer={null}
        centered
        width={700}
      >
        {currentBooking ? (
          <>
            <Descriptions
              bordered
              column={1}
              size='middle'
              style={{ marginBottom: 20 }}
            >
              <Descriptions.Item label='Địa điểm'>
                {currentBooking.place?.name}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày đặt dịch vụ'>
                {dayjs(currentBooking.createdAt).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày check in'>
                {/* {new Date(currentBooking.checkInDate).toLocaleDateString()} */}
                {dayjs(currentBooking.checkInDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label='Ngày check out'>
                {dayjs(currentBooking.checkOutDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label='Trạng thái đơn đặt'>
                {currentBooking.status === 'pending' ? (
                  <Tag icon={<SyncOutlined spin />} color='processing'>
                    Đang xử lý
                  </Tag>
                ) : currentBooking.status === 'confirmed' ? (
                  <Tag icon={<CheckCircleOutlined />} color='success'>
                    Thành công
                  </Tag>
                ) : currentBooking.status === 'paid' ? (
                  <Tag icon={<CheckCircleOutlined />} color='success'>
                    Thành công
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color='error'>
                    Đã hủy
                  </Tag>
                )}
              </Descriptions.Item>
              {currentBooking.status !== 'cancelled' && (
                <>
                  <Descriptions.Item label='Tổng tiền'>
                    <Text strong style={{ fontSize: 16, color: '#1677ff' }}>
                      {currentBooking.totalPrice?.toLocaleString()} VNĐ
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label='Trạng thái thanh toán'>
                    <Text
                      strong
                      style={{
                        fontSize: 16,
                        color:
                          (currentBooking.payment?.method === 'offline' &&
                            Number(currentBooking?.totalPrice) !==
                              Number(currentBooking?.payment?.amount)) ||
                          (currentBooking.payment?.method !== 'offline' &&
                            currentBooking.payment?.paymentType !== 'full')
                            ? '#ff4d4f'
                            : '#52c41a'
                      }}
                    >
                      {currentBooking.payment?.method === 'offline' &&
                      Number(currentBooking?.totalPrice) !==
                        Number(currentBooking?.payment?.amount)
                        ? 'Thanh toán khi sử dụng dịch vụ'
                        : currentBooking.payment?.method !== 'offline' &&
                          currentBooking.payment?.paymentType === 'deposit'
                        ? `Thanh toán 1 phần (${currentBooking.payment?.amount?.toLocaleString()} VNĐ)`
                        : 'Đã thanh toán'}
                    </Text>
                  </Descriptions.Item>
                  {
                    <Descriptions.Item label='Tiền cần trả sau'>
                      <Text strong style={{ fontSize: 16, color: '#ff4d4f' }}>
                        {(
                          currentBooking.totalPrice -
                          currentBooking.payment?.amount
                        ).toLocaleString()}{' '}
                        VNĐ
                      </Text>
                    </Descriptions.Item>
                  }
                </>
              )}
            </Descriptions>

            <Divider>Chi tiết dịch vụ / phòng</Divider>

            <List
              dataSource={currentBooking.bookingDetails || []}
              bordered
              renderItem={(item) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 5
                      }}
                    >
                      <Text strong>
                        {item.roomTypeName ||
                          item.serviceName ||
                          'Dịch vụ khác'}
                      </Text>
                      <Text type='secondary'>
                        {item.priceAtBooking?.toLocaleString()} VNĐ
                      </Text>
                    </div>
                    <div>
                      <Text type='secondary'>Số lượng: {item.quantity}</Text>
                    </div>

                    {item.roomTypeName ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {' '}
                        <Text type='secondary'>
                          Số ngày:{' '}
                          {Math.ceil(
                            (new Date(currentBooking.checkOutDate) -
                              new Date(currentBooking.checkInDate)) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </Text>
                        <Text type='secondary'>
                          Tổng tiền:{' '}
                          {(
                            Number(item.priceAtBooking) *
                            Number(item.quantity) *
                            Number(
                              Math.ceil(
                                (new Date(currentBooking.checkOutDate) -
                                  new Date(currentBooking.checkInDate)) /
                                  (1000 * 60 * 60 * 24)
                              )
                            )
                          ).toLocaleString()}{' '}
                          VNĐ
                        </Text>{' '}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Text></Text>
                        <Text type='secondary'>
                          Tổng tiền:{' '}
                          {(
                            Number(item.priceAtBooking) * Number(item.quantity)
                          ).toLocaleString()}
                          VNĐ
                        </Text>{' '}
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </>
        ) : (
          <Text>Không có dữ liệu chi tiết.</Text>
        )}
      </Modal>
      <Modal
        title='Xác nhận xóa đơn đặt'
        open={openModalDelete}
        onOk={handleDelete}
        onCancel={() => setOpenModalDelete(false)}
        okText={'Xác nhận xóa'}
        cancelText={'Hủy'}
      >
        <p>Bạn chắc chắn muốn xóa đơn đặt?</p>
      </Modal>

      <Modal
        title='Xác nhận hủy đơn đặt'
        open={openModalCancel}
        onOk={handleCancel}
        onCancel={() => setOpenModalCancel(false)}
        okText={'Xác nhận hủy'}
        cancelText={'Hủy'}
      >
        <p>
          <Text style={{ color: 'red', fontWeight: 600 }}>
            Bạn hãy đọc kỹ các chính sách hủy và hoàn tiền trước khi xác nhận{' '}
          </Text>
          <br />
          {selectedBooking
            ? `Bạn chắc chắn muốn hủy đơn đặt của ${selectedBooking?.placeName}? `
            : 'Bạn chắc chắn muốn hủy đơn đặt?'}
          <br />
        </p>
      </Modal>
    </>
  );
}

export default Booking;
