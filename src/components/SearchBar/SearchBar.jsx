// src/components/SearchBar/SearchBar.jsx
import { Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;
const { Text } = Typography;
function SearchBar({ placeholder = 'Tìm kiếm...', onSearch, onFilterType }) {
  const [value, setValue] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
    if (onSearch) onSearch(keyword);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    if (onFilterType) onFilterType(value);
  };
  const placeTypes = [
    {
      key: 'hotel',
      label: '🏨 Khách sạn / Nhà nghỉ'
    },
    {
      key: 'cafe',
      label: '☕ Quán cafe'
    },
    {
      key: 'restaurant',
      label: '🍴 Địa điểm ăn uống'
    },
    {
      key: 'touristSpot',
      label: '🏝️ Địa điểm du lịch'
    }
  ];
  return (
    <Space>
      <Text strong>Chọn loại địa điểm: </Text>
      <Select
        placeholder='Chọn loại địa điểm'
        style={{ width: 200 }}
        allowClear
        value={selectedType || undefined}
        onChange={handleTypeChange}
      >
        {placeTypes.map((pt) => (
          <Option key={pt.key} value={pt.key}>
            {pt.label}
          </Option>
        ))}
      </Select>
      <Text strong>Nhập từ khóa: </Text>
      <Input
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        value={value}
        onChange={handleSearchChange}
        style={{ width: 300 }}
        allowClear
      />
    </Space>
  );
}

export default SearchBar;
