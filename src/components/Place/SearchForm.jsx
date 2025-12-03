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

import styles from './style.module.css';

import { motion } from 'motion/react'; // eslint-disable-line
import { SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function SearchForm({ onSearch }) {
  const { containerSearch, searchLocationContainer } = styles;
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    searchText: ''
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.location) {
      message.error('Vui lòng chọn điểm đến');
      return;
    }

    const data = {
      location: formData.location,
      searchText: formData.searchText,
      isSearch: true
    };
    if (onSearch) onSearch(data);
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
    <motion.div
      className={searchLocationContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className={containerSearch}>
        <Row gutter={16} align='middle'>
          <Col xs={24} md={8}>
            <Title level={4} style={{ marginBottom: 10 }}>
              Chọn điểm đến
            </Title>
            <Select
              showSearch
              placeholder='Chọn địa điểm'
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
          <Col xs={24} md={8}>
            <Title level={4} style={{ marginBottom: 10 }}>
              Nhập tên địa điểm (tùy chọn)
            </Title>
            <Input
              size='large'
              style={{ width: '100%' }}
              placeholder='Nhập tên địa điểm'
              onChange={(e) => handleChange('searchText', e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Button
              type='primary'
              block
              size='large'
              style={{ background: '#1890ff', marginTop: 60, borderRadius: 6 }}
              onClick={handleSubmit}
            >
              <SearchOutlined /> Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
}
