import {
  Button,
  DatePicker,
  Input,
  Row,
  Col,
  Card,
  Typography,
  InputNumber,
  message,
  Select
} from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from '../style.module.css';
import { useDispatch } from 'react-redux';
import { setStateBooking } from '../../../redux/slices/hotelSlice';
const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function SearchForm({ onSearch }) {
  const { containerSearch } = styles;
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    dateRange: [],
    guests: 1
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const [checkIn, checkOut] = formData.dateRange || [];
    if (!formData.location) {
      message.error('Vui lòng chọn địa điểm');
      return;
    }
    // Kiểm tra ngày hợp lệ
    if (!checkIn || !checkOut) {
      message.error('Vui lòng chọn ngày check-in và check-out');
      return;
    }
    if (checkOut.isBefore(checkIn)) {
      message.error('Ngày check-out không được trước ngày check-in');
      return;
    }
    const data = {
      location: formData.location,
      checkIn: checkIn.format('YYYY-MM-DD'), // string OK
      checkOut: checkOut.format('YYYY-MM-DD'), // string OK
      guests: formData.guests
    };
    dispatch(setStateBooking(data));
    if (onSearch) onSearch(formData);
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
    <Card className={containerSearch}>
      <Row gutter={16} align='middle'>
        <Col xs={24} md={6}>
          <Title level={4} style={{ marginBottom: 10 }}>
            Chọn địa điểm đến
          </Title>
          <Select
            showSearch
            placeholder='Chọn địa điểm'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              label: city.name,
              value: city.name
            }))}
            size='large'
            style={{ width: '100%' }}
            value={formData.location || undefined}
            onChange={(value) => handleChange('location', value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Title level={4} style={{ marginBottom: 10 }}>
            Ngày dự kiến
          </Title>
          <RangePicker
            size='large'
            style={{ width: '100%' }}
            value={formData.dateRange}
            onChange={(val) => handleChange('dateRange', val)}
            format='DD/MM/YYYY'
            disabledDate={(current) => {
              return current && current < dayjs().startOf('day');
            }}
          />
        </Col>
        <Col xs={24} md={6}>
          <Title level={4} style={{ marginBottom: 10 }}>
            Số lượng hành khách
          </Title>
          <InputNumber
            size='large'
            style={{ width: '100%' }}
            value={formData.guests}
            min={1}
            onChange={(val) => handleChange('guests', val)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Button
            type='primary'
            block
            size='large'
            style={{ background: '#1890ff', marginTop: 60, borderRadius: 6 }}
            onClick={handleSubmit}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
