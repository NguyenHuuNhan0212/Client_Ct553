import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  DatePicker,
  Button,
  Tag,
  Divider,
  Space,
  Select
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function ItineraryForm({
  form,
  setForm,
  handleDateChange,
  handleSave
}) {
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
  return (
    <Card
      title='🗓️ Tạo lịch trình cá nhân'
      extra={
        <Button type='primary' onClick={handleSave}>
          Lưu lịch trình
        </Button>
      }
      style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Input
          placeholder='Tên lịch trình (VD: Khám phá Cần Thơ 3 ngày)'
          size='large'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Select
          showSearch
          placeholder='Chọn địa điểm đến'
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
          onChange={(value) => setForm({ ...form, destination: value })}
        />
        <Input
          placeholder='Người tạo'
          size='large'
          value={form.creatorName}
          onChange={(e) => setForm({ ...form, creatorName: e.target.value })}
        />
        <RangePicker
          size='large'
          onChange={handleDateChange}
          format='YYYY-MM-DD'
          style={{ width: '100%' }}
          disabledDate={(current) => {
            return current && current < dayjs().startOf('day');
          }}
        />
        {form.numDays > 0 && (
          <Tag color='blue'>Tổng số ngày: {form.numDays}</Tag>
        )}
      </Space>

      <Divider />
    </Card>
  );
}
