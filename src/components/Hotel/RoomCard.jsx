import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Modal,
  Checkbox,
  Radio,
  message
} from 'antd';
import { FaBed, FaVuejs } from 'react-icons/fa';
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { capitalizeName } from '../../utils/capitalize';
const { Title, Text, Paragraph } = Typography;

import { DatePicker, InputNumber, Form } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import PaymentMethodSelect from '../PaymentMethod/PaymentMethod';
import CancelPolicy from '../Profile/BookingComponents/CancelPolicy';

const RoomCard = ({ room, onBook, facilities = [] }) => {
  const { roomCard, roomCover, roomIcon, roomOverlay, amenitiesWrap } = styles;
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [radioValue, setRadioValue] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [serviceQuantities, setServiceQuantities] = useState({});
  const { checkIn, checkOut } = useSelector((state) => state.hotel);
  // 🔥 Hàm tính tổng tiền
  const calculateTotal = (values) => {
    if (!values.dateRange || values.dateRange.length < 2) return 0;

    let nights =
      dayjs(values.dateRange[1]).diff(dayjs(values.dateRange[0]), 'day') + 1;
    if (nights === 0) {
      nights = 1;
    }

    const roomCost = nights * room.pricePerNight * (values.quantity || 1);

    const serviceCost = (values.services || []).reduce((sum, id) => {
      const s = room.services.find((srv) => srv._id === id);
      const qty = serviceQuantities[id] || 1;
      return sum + (s ? s.price * qty : 0);
    }, 0);

    return roomCost + serviceCost;
  };
  const onChangeCheckBox = (e) => {
    setChecked(e.target.checked);
  };
  const handleOk = () => {
    if (!isChecked) {
      message.warning('Vui lòng tick chấp nhận chính sách trước khi tiếp tục!');
      return;
    }
    form.validateFields().then((values) => {
      const roomDetail = {
        roomTypeId: checkIn && checkOut ? room.roomTypeId : room._id,
        quantity: values.quantity || 1,
        checkInDate: values.dateRange[0].toDate().toISOString(),
        checkOutDate: values.dateRange[1].toDate().toISOString(),
        pricePerNight: room.pricePerNight
      };

      const serviceDetails = (values.services || []).map((id) => {
        const s = room.services.find((srv) => srv._id === id);
        return {
          serviceId: s._id,
          quantity: serviceQuantities[id] || 1,
          price: s.price
        };
      });

      const payload = {
        paymentMethod: values.paymentMethod,
        checkInDate: roomDetail.checkInDate,
        checkOutDate: roomDetail.checkOutDate,
        details: [roomDetail, ...serviceDetails],
        totalPrice
      };

      onBook(payload);
      form.resetFields();
      setBookingOpen(false);
    });
  };
  useEffect(() => {
    const unsubscribe = form.subscribe?.(() => {
      const values = form.getFieldsValue();
      setTotalPrice(calculateTotal(values));
    });

    return () => unsubscribe?.();
  }, [form, room]); // eslint-disable-line
  return (
    <>
      <Card
        className={roomCard}
        hoverable
        onClick={() => setOpen(true)}
        cover={
          <div className={roomCover}>
            <FaBed className={roomIcon} />
            <div className={roomOverlay} onClick={(e) => e.stopPropagation()}>
              <Button type='primary' onClick={() => setBookingOpen(true)}>
                Đặt ngay
              </Button>
            </div>
          </div>
        }
      >
        <Title level={4}>{capitalizeName(room.name)}</Title>
        <Space size='small' wrap>
          <Tag color='blue'>{room.capacity} người</Tag>
          <Tag color='green'>{room.pricePerNight.toLocaleString()} / ngày</Tag>
        </Space>
      </Card>

      {/* Modal chi tiết */}
      <Modal
        title={`Chi tiết ${room.name}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Paragraph>
          <Text strong>Số người tối đa: </Text> {room.capacity}
        </Paragraph>
        <Paragraph>
          <Text strong>Giá: </Text> {room.pricePerNight.toLocaleString()}/ đêm
        </Paragraph>
        <Divider />
        <Text strong>Tiện ích hiện có:</Text>
        <div className={amenitiesWrap}>
          {facilities?.length > 0 ? (
            facilities.map((a, idx) => (
              <Tag key={idx} color='geekblue'>
                {a}
              </Tag>
            ))
          ) : (
            <Paragraph type='secondary' italic>
              Không có tiện ích
            </Paragraph>
          )}
        </div>
      </Modal>

      {/* Modal đặt phòng */}
      <Modal
        title={`Đặt ${room.name}`}
        open={bookingOpen}
        onCancel={() => setBookingOpen(false)}
        onOk={() => {
          handleOk();
        }}
        width={700}
        okText='Xác nhận'
        cancelText='Hủy'
      >
        <Form
          form={form}
          layout='vertical'
          onValuesChange={() => {
            const values = form.getFieldsValue();
            setTotalPrice(calculateTotal(values));
          }}
        >
          <Form.Item
            name='dateRange'
            label='Ngày nhận - trả phòng'
            rules={[{ required: true, message: 'Chọn ngày!' }]}
          >
            <RangePicker
              style={{ width: '100%' }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf('day');
              }}
            />
          </Form.Item>

          <Form.Item
            name='quantity'
            label='Số lượng phòng'
            rules={[{ required: true, message: 'Nhập số lượng!' }]}
          >
            <InputNumber
              min={0}
              max={20}
              defaultValue={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label='Dịch vụ thêm' name='services'>
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={() => {
                const values = form.getFieldsValue();
                setTotalPrice(calculateTotal(values));
              }}
            >
              {room.services?.map((service) => {
                const selected = form
                  .getFieldValue('services')
                  ?.includes(service._id);
                return (
                  <div
                    key={service._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8
                    }}
                  >
                    <Checkbox value={service._id}>
                      {service.name} ({service.price.toLocaleString()}đ)
                    </Checkbox>
                    {selected && (
                      <>
                        <Text strong>Số lượng:</Text>
                        <InputNumber
                          min={1}
                          max={10}
                          value={serviceQuantities[service._id] || 1}
                          onChange={(val) => {
                            setServiceQuantities((prev) => ({
                              ...prev,
                              [service._id]: val || 1
                            }));
                            const values = form.getFieldsValue();
                            setTotalPrice(calculateTotal(values));
                          }}
                          style={{ width: 70, marginLeft: 8 }}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </Checkbox.Group>
          </Form.Item>

          <Divider />
          <Title level={4} style={{ textAlign: 'right' }}>
            Tổng tiền:{' '}
            <span style={{ color: 'red' }}>
              {totalPrice.toLocaleString()}VNĐ
            </span>
          </Title>
          <Divider>Phương thức thanh toán</Divider>
          <Form.Item
            name='paymentMethod'
            rules={[
              { required: true, message: 'Chọn phương thức thanh toán!' }
            ]}
          >
            <PaymentMethodSelect
              value={radioValue}
              onChange={(val) => setRadioValue(val)}
            />
          </Form.Item>
        </Form>
        <CancelPolicy />
        <Checkbox
          style={{ marginTop: 10 }}
          defaultChecked={isChecked}
          onChange={onChangeCheckBox}
        >
          Tôi đã đọc kỹ và đồng ý với chính sách
        </Checkbox>
      </Modal>
    </>
  );
};

export default RoomCard;
