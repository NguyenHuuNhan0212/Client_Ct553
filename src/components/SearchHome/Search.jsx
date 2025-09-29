import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import { motion } from 'framer-motion'; // eslint-disable-line
import {
  EnvironmentOutlined,
  SearchOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import styles from './style.module.css';

const { Option } = Select;

export default function SearchLocation({ onSearch }) {
  const [formData, setFormData] = useState({
    city: '',
    type: '',
    keyword: ''
  });

  const [cities, setCities] = useState([]);

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
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (onSearch) onSearch(formData);
    console.log('🔍 Params:', formData);
  };
  console.log(formData);
  return (
    <motion.div
      className={styles.searchLocationContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.searchBox}>
        {/* Thành phố */}
        <Select
          size='large'
          placeholder='Chọn thành phố'
          value={formData.city || undefined}
          onChange={(value) => handleChange('city', value)}
          className={styles.searchSelect}
        >
          {cities?.map((item, index) => {
            return (
              <Option key={index} value={item.codename}>
                {item.name}
              </Option>
            );
          })}
        </Select>

        {/* Loại địa điểm */}
        <Select
          size='large'
          placeholder='Chọn loại dịch vụ'
          value={formData.type || undefined}
          onChange={(value) => handleChange('type', value)}
          className={styles.searchSelect}
        >
          <Option value='hotel'>Khách sạn</Option>
          <Option value='cafe'>Quán cafe</Option>
          <Option value='resort'>Resort</Option>
          <Option value='homestay'>Homestay</Option>
        </Select>

        {/* Từ khóa */}
        <Input
          size='large'
          placeholder='Nhập tên địa điểm...'
          prefix={<AppstoreOutlined style={{ color: '#1890ff' }} />}
          value={formData.keyword}
          onChange={(e) => handleChange('keyword', e.target.value)}
          className={styles.searchInput}
        />

        {/* Nút tìm kiếm */}
        <Button
          type='primary'
          size='large'
          icon={<SearchOutlined />}
          className={styles.searchBtn}
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>
    </motion.div>
  );
}
