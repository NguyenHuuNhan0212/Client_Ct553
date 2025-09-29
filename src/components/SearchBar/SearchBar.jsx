// src/components/SearchBar/SearchBar.jsx
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

function SearchBar({ placeholder = 'Tìm kiếm...', onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
    onSearch(keyword); // gọi callback để filter dữ liệu
  };

  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      style={{ width: 300 }}
      allowClear
    />
  );
}

export default SearchBar;
