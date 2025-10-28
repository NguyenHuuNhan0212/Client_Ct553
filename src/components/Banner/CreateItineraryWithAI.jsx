import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Typography,
  Modal,
  Divider,
  Select,
  Space,
  message,
  Spin
} from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  SendOutlined,
  RobotOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  createItineraryWithAI,
  setItineraryInfoAI
} from '../../redux/slices/itinerarySlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const TripPlanFormWithAI = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const handleFinish = async (values) => {
    setIsLoading(true);
    if (!user) {
      message.warning('Đăng nhập để tạo lịch trình.');
      navigate('/login');
      return;
    } else {
      try {
        const { title, destination, dateRange } = values;
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        const creatorName = user?.fullName;
        const tripData = {
          title,
          city: destination,
          startDate,
          endDate,
          creatorName
        };
        dispatch(setItineraryInfoAI(tripData));
        await dispatch(createItineraryWithAI(tripData)).unwrap();
        navigate('trip-plans/create');
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        message.error(err.message);
      }
    }
  };

  const handleChange = (key, value) => {
    form.setFieldsValue({ [key]: value });
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://provinces.open-api.vn/api/v2');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('Lỗi khi load tỉnh thành:', err);
      }
    };
    fetchCities();
  }, []);
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={520}
      styles={{
        body: {
          padding: '32px 36px 40px',
          background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
          borderRadius: 16
        }
      }}
      title={
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #1677ff, #69b1ff)',
              color: '#fff',
              borderRadius: '50%',
              width: 60,
              height: 60,
              fontSize: 28,
              boxShadow: '0 4px 10px rgba(22, 119, 255, 0.4)',
              marginBottom: 16
            }}
          >
            <RobotOutlined />
          </div>
          <Title level={3} style={{ marginBottom: 4, color: '#1677ff' }}>
            Tạo lịch trình du lịch cùng AI
          </Title>
          <Text type='secondary'>
            Nhập thông tin cơ bản để AI gợi ý hành trình hoàn hảo cho bạn.
          </Text>
        </div>
      }
    >
      <Divider style={{ margin: '24px 0 16px 0' }} />

      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        requiredMark={false}
      >
        <Form.Item
          label={
            <Text strong style={{ fontSize: 15 }}>
              Tiêu đề chuyến đi
            </Text>
          }
          name='title'
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề chuyến đi!' }
          ]}
        >
          <Input
            size='large'
            placeholder='Ví dụ: Hành trình khám phá Đà Lạt 3N2Đ'
            prefix={<SendOutlined style={{ color: '#1677ff' }} />}
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          label={
            <Text strong style={{ fontSize: 15 }}>
              Điểm đến
            </Text>
          }
          name='destination'
          rules={[{ required: true, message: 'Vui lòng nhập điểm đến!' }]}
        >
          <Select
            showSearch
            placeholder={
              <Space>
                <EnvironmentOutlined style={{ color: '#1677ff' }} />
                Chọn điểm đến
              </Space>
            }
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              label: city.name,
              value: city.name
            }))}
            size='large'
            style={{ width: '100%' }}
            value={form.destination || undefined}
            onChange={(value) => handleChange('destination', value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <Text strong style={{ fontSize: 15 }}>
              Ngày dự kiến
            </Text>
          }
          name='dateRange'
          rules={[{ required: true, message: 'Vui lòng chọn ngày dự kiến!' }]}
        >
          <DatePicker.RangePicker
            size='large'
            format='DD/MM/YYYY'
            style={{ width: '100%', borderRadius: 8 }}
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            suffixIcon={<CalendarOutlined style={{ color: '#1677ff' }} />}
            disabledDate={(current) =>
              current && current < dayjs().endOf('day')
            }
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 32 }}>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            style={{
              height: 50,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1677ff, #4096ff)',
              boxShadow: '0 4px 16px rgba(22, 119, 255, 0.35)',
              fontSize: 16,
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
          >
            ✨ Tạo lịch trình với AI
          </Button>
        </Form.Item>
      </Form>
      {isLoading && (
        <Spin
          fullscreen
          tip={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
                🧭 AI đang lên kế hoạch cho bạn...
              </div>
              <div style={{ color: '#1677ff', fontWeight: 500, fontSize: 14 }}>
                Vui lòng chờ trong giây lát...⏳
              </div>
            </div>
          }
        />
      )}
    </Modal>
  );
};

export default TripPlanFormWithAI;
