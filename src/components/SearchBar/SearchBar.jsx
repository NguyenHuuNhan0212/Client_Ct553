// src/components/SearchBar/SearchBar.jsx
import { Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
const { Option } = Select;
const { Text } = Typography;
function SearchBar({
  placeholder = 'Tìm kiếm...',
  onSearch,
  onFilterType,
  type = '',
  searchKeyword = '',
  isAdmin = false,
  onFilterSupplier,
  supplier = ''
}) {
  const [value, setValue] = useState(searchKeyword);
  const [selectedType, setSelectedType] = useState(type);
  const [selectedSupplier, setSelectedSupplier] = useState(supplier);
  const [suppliers, setSuppliers] = useState([]);
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
    if (onSearch) onSearch(keyword);
  };

  const handleSupplierChange = (value) => {
    setSelectedSupplier(value);
    if (onFilterSupplier) onFilterSupplier(value);
  };
  const handleTypeChange = (value) => {
    setSelectedType(value);
    if (onFilterType) onFilterType(value);
  };
  const supplierNames = suppliers.map((s) => ({
    key: s.fullName,
    label: s.fullName
  }));
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
  useEffect(() => {
    setValue(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    setSelectedType(type);
  }, [type]);
  useEffect(() => {
    setSelectedSupplier(supplier);
  }, [supplier]);
  useEffect(() => {
    if (isAdmin) {
      const fetchData = async () => {
        try {
          const res = await userApi.getAllSupplier();
          setSuppliers(res);
        } catch (err) {
          console.log(err.message || 'Lỗi khi load suppliers');
        }
      };
      fetchData();
    }
  }, [isAdmin]);
  return (
    <Space>
      {!isAdmin && <Text strong>Chọn loại địa điểm: </Text>}

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
      {isAdmin && (
        <Select
          placeholder='Chọn nhà cung cấp'
          style={{ width: 200 }}
          allowClear
          value={selectedSupplier || undefined}
          onChange={handleSupplierChange}
        >
          {supplierNames.map((pt) => (
            <Option key={pt.key} value={pt.key}>
              {pt.label}
            </Option>
          ))}
        </Select>
      )}
      {!isAdmin && <Text strong>Nhập từ khóa: </Text>}

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
