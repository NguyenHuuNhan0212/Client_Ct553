import React, { useEffect, useState } from 'react';
import {
  Form,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Card,
  message,
  Typography
} from 'antd';
import dayjs from 'dayjs';
import placeApi from '../../../apis/placeService';
import bookingApi from '../../../apis/bookingService';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const InternalBookingForm = ({ placeId, onClose }) => {
  const [form] = Form.useForm();
  const [roomTypes, setRoomTypes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await placeApi.getOnePlace(placeId);
        setRoomTypes(res.roomTypes || []);
      } catch (err) {
        message.error('Không tải được danh sách loại phòng.', err);
      }
    };
    fetchRoomTypes();
  }, [placeId]);

  const handleValuesChange = (_, allValues) => {
    const { roomTypeId, dateRange, quantity } = allValues;
    const room = roomTypes.find((r) => r._id === roomTypeId);
    if (!room || !dateRange || dateRange.length !== 2) {
      setTotalPrice(0);
      return;
    }

    const checkIn = dayjs(dateRange[0]);
    const checkOut = dayjs(dateRange[1]);
    const nights = checkOut.diff(checkIn, 'day');

    if (nights > 0) {
      const total = room.pricePerNight * (quantity || 1) * nights;
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  const handleSubmit = async (values) => {
    const { roomTypeId, dateRange, quantity } = values;
    if (!dateRange || dateRange.length !== 2) {
      message.error('Vui lòng chọn ngày check-in và check-out.');
      return;
    }

    const payload = {
      placeId,
      roomTypeId,
      checkInDate: dateRange[0],
      checkOutDate: dateRange[1],
      quantity
    };

    try {
      await bookingApi.createBookingInternal(payload);
      message.success('Tạo booking nội bộ thành công!');
      form.resetFields();
      setTotalPrice(0);
      onClose(false);
    } catch (err) {
      message.error(err.response?.data?.error || 'Không thể tạo booking.');
    }
  };

  return (
    <Card
      title={
        <Title level={5} style={{ textAlign: 'center' }}>
          🧾 Tạo Booking Nội Bộ
        </Title>
      }
      variant='borderless'
      className='shadow-md rounded-xl'
    >
      <Form
        form={form}
        layout='vertical'
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
        initialValues={{ quantity: 1 }}
      >
        <Form.Item
          label='Loại phòng'
          name='roomTypeId'
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
        >
          <Select placeholder='Chọn loại phòng'>
            {roomTypes.map((room) => (
              <Option key={room._id} value={room._id}>
                {room.name} — {room.pricePerNight.toLocaleString()}đ/đêm
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Ngày Check-in / Check-out'
          name='dateRange'
          rules={[{ required: true, message: 'Vui lòng chọn khoảng ngày' }]}
        >
          <RangePicker
            format='DD/MM/YYYY'
            style={{ width: '100%' }}
            disabledDate={(current) => {
              return current && current < dayjs().startOf('day');
            }}
          />
        </Form.Item>

        <Form.Item
          label='Số lượng phòng'
          name='quantity'
          rules={[{ required: true, message: 'Vui lòng nhập số lượng phòng' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label='Tổng tiền dự kiến'>
          <strong>
            {totalPrice ? totalPrice.toLocaleString() + 'đ' : '---'}
          </strong>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Tạo Booking
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default InternalBookingForm;
