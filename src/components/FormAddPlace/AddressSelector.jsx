import React, { useEffect, useState } from 'react';
import { Form, Select, Row, Col } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddressSelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/v2').then((res) => {
      setProvinces(res.data);
    });
  }, []);

  const handleProvinceChange = (_, option) => {
    setSelectedProvince(option.key);
    setDistricts([]);
    axios
      .get(`https://provinces.open-api.vn/api/v2/p/${option.key}?depth=2`)
      .then((res) => {
        setDistricts(res.data.wards);
      });
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name='province'
          label='Tỉnh/TP'
          rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/TP' }]}
        >
          <Select
            placeholder='Chọn Tỉnh/TP'
            onChange={handleProvinceChange}
            allowClear
          >
            {provinces.map((p) => (
              <Option key={p.code} value={p.name}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='ward'
          label='Xã'
          rules={[{ required: true, message: 'Vui lòng chọn Xã' }]}
        >
          <Select placeholder='Chọn Xã' disabled={!selectedProvince} allowClear>
            {districts.map((d) => (
              <Option key={d.code} value={d.name}>
                {d.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddressSelector;
