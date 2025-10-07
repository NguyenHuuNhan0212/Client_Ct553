import {
  Divider,
  Modal,
  Button,
  Collapse,
  Form,
  DatePicker,
  InputNumber,
  Typography,
  message,
  Radio,
  Checkbox
} from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../redux/slices/bookingSlice';
import paymentApi from '../../apis/paymentService';
import PaymentMethodSelect from '../PaymentMethod/PaymentMethod';
import CancelPolicy from '../Profile/BookingComponents/CancelPolicy';

const { RangePicker } = DatePicker;
const { Title } = Typography;

function ServiceOfPlace({ services, isHotel = false }) {
  const [activeKey, setActiveKey] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const dispatch = useDispatch();
  const { currentPlace } = useSelector((state) => state.place);
  const { currentHotel } = useSelector((state) => state.hotel);
  const [radioValue, setRadioValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isChecked, setChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const items = services.map((s, index) => ({
    key: String(index),
    label: (
      <span>
        {s.name} - <b>{s.price.toLocaleString()}</b>
      </span>
    ),
    children: (
      <div>
        <p>
          <b>Loại dịch vụ:</b> {s.type}
        </p>
        <p>
          <b>Mô tả:</b> {s.description || 'Chưa có mô tả cho dịch vụ này.'}
        </p>
        <div style={{ textAlign: 'right' }}>
          <Button type='primary' onClick={() => handleBooking(s)}>
            Đặt dịch vụ
          </Button>
        </div>
      </div>
    )
  }));

  const onChange = (key) => {
    setActiveKey(key);
  };
  const onChangeCheckBox = (e) => {
    setChecked(e.target.checked);
  };
  const handleBooking = (s) => {
    setSelectedService(s);
    setOpen(true);
    form.resetFields();
    setTotalPrice(0);
  };

  const calculateTotal = (values) => {
    if (!selectedService) return 0;
    const price = selectedService.price;

    let days = 1;
    if (values.dateRange && values.dateRange.length === 2) {
      const start = dayjs(values.dateRange[0]);
      const end = dayjs(values.dateRange[1]);
      days = end.diff(start, 'day') || 1;
    }

    const quantity = values.quantity || 1;
    return price * quantity * days;
  };

  const handleOk = async () => {
    if (!isChecked) {
      message.warning('Vui lòng tick chấp nhận chính sách trước khi tiếp tục!');
      return;
    }
    try {
      const values = await form.validateFields();
      const placeId = isHotel
        ? currentHotel?.info?._id
        : currentPlace?.info?._id;
      const data = {
        placeId,
        checkInDate: values.dateCheckIn,
        checkOutDate: values.dateCheckIn,
        details: [
          {
            serviceId: selectedService._id,
            price: selectedService.price,
            quantity: values.quantity || 1
          }
        ]
      };
      dispatch(createBooking(data))
        .unwrap()
        .then(async (booking) => {
          const bookingId = booking?.booking?._id;
          if (!bookingId) {
            message.error('Không lấy được mã booking!');
            return;
          }
          try {
            const res = await paymentApi.createPayment({
              bookingId,
              deposit: radioValue === 'deposit',
              isOffline: radioValue === 'offline'
            });

            const { paymentUrl } = res;

            if (paymentUrl) {
              window.location.href = paymentUrl; // Chuyển hướng tới VNPAY
            } else {
              message.success(
                'Đặt dịch vụ thành công (Thanh toán khi sử dụng dịch vụ)'
              );
            }
          } catch (error) {
            message.error('Lỗi khi tạo thanh toán!', error);
          }
        })
        .catch((err) => message.error(err?.message || 'Đặt phòng thất bại'));
      setChecked(false);
      setOpen(false);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Divider style={{ fontSize: '20px' }}>
        Khám phá các dịch vụ mà địa điểm cung cấp
      </Divider>
      <p
        style={{
          marginBottom: 5,
          fontSize: '16px',
          color: '#555',
          fontWeight: '500'
        }}
      >
        Nhấn vào dịch vụ để xem chi tiết hoặc đặt dịch vụ mong muốn.
      </p>
      <Collapse
        items={items}
        defaultActiveKey={activeKey}
        accordion
        onChange={onChange}
        style={{ textAlign: 'left', width: '100%' }}
      />

      <Modal
        title={`Đặt ${selectedService?.name || ''}`}
        open={open}
        width={700}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
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
            name='dateCheckIn'
            label='Ngày bắt đầu'
            rules={[{ required: true, message: 'Chọn ngày!' }]}
          >
            <DatePicker
              format='DD-MM-YYYY'
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current && current < dayjs().endOf('day')
              }
            />
          </Form.Item>

          <Form.Item
            name='quantity'
            label='Số lượng'
            initialValue={1}
            rules={[{ required: true, message: 'Nhập số lượng!' }]}
          >
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>

          {/* ✅ Hiển thị tổng tiền realtime */}
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
    </div>
  );
}

export default ServiceOfPlace;
