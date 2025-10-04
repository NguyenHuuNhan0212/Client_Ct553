import {
  Divider,
  Modal,
  Button,
  Collapse,
  Form,
  DatePicker,
  InputNumber,
  Typography,
  message
} from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../redux/slices/bookingSlice';

const { RangePicker } = DatePicker;
const { Title } = Typography;

function ServiceOfPlace({ services }) {
  const [activeKey, setActiveKey] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);

  const items = services.map((s, index) => ({
    key: String(index),
    label: (
      <span>
        {s.name} - <b>{s.price.toLocaleString()}K</b>
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
    try {
      const values = await form.validateFields();
      const total = calculateTotal(values);
      const data = {
        checkInDate: values.dateRange[0].toDate().toISOString(),
        checkOutDate: values.dateRange[1].toDate().toISOString(),
        details: [
          {
            serviceId: selectedService._id,
            price: selectedService.price,
            quantity: values.quantity || 1
          }
        ]
      };
      dispatch(createBooking(data));
      message.success(
        `Bạn đã đặt ${
          selectedService.name
        } với tổng tiền ${total.toLocaleString()}K`
      );

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
      />

      <Modal
        title={`Đặt ${selectedService?.name || ''}`}
        open={open}
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
            name='dateRange'
            label='Ngày bắt đầu - kết thúc'
            rules={[{ required: true, message: 'Chọn ngày!' }]}
          >
            <RangePicker />
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
            Tổng tiền: <span style={{ color: 'red' }}>{totalPrice}K</span>
          </Title>
        </Form>
      </Modal>
    </div>
  );
}

export default ServiceOfPlace;
