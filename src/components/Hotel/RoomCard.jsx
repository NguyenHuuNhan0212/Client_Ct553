import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Modal,
  Checkbox
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

const RoomCard = ({ room, onBook, facilities = [] }) => {
  const { roomCard, roomCover, roomIcon, roomOverlay, amenitiesWrap } = styles;
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
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
      return sum + (s ? s.price : 0);
    }, 0);

    return roomCost + serviceCost;
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      const roomDetail = {
        roomTypeId: checkIn && checkOut ? room.romTypeId : room._id,
        quantity: values.quantity || 1,
        checkInDate: values.dateRange[0].toDate().toISOString(),
        checkOutDate: values.dateRange[1].toDate().toISOString(),
        pricePerNight: room.pricePerNight
      };

      // build detail cho service
      const serviceDetails = (values.services || []).map((id) => {
        const s = room.services.find((srv) => srv._id === id);
        return {
          serviceId: s._id,
          quantity: 1,
          price: s.price
        };
      });

      const payload = {
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
          <Tag color='green'>{room.pricePerNight.toLocaleString()}K / ngày</Tag>
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
          <Text strong>Giá: </Text> {room.pricePerNight.toLocaleString()}K / đêm
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
              max={10}
              defaultValue={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label='Dịch vụ thêm' name='services'>
            <Checkbox.Group style={{ width: '100%' }}>
              {room.services?.map((service) => (
                <Checkbox key={service._id} value={service._id}>
                  {service.name} ({service.price}K)
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          {/* ✅ Hiển thị tổng tiền realtime */}
          <Divider />
          <Title level={4} style={{ textAlign: 'right' }}>
            Tổng tiền: <span style={{ color: 'red' }}>{totalPrice}K</span>
          </Title>
        </Form>
      </Modal>
    </>
  );
};

export default RoomCard;
