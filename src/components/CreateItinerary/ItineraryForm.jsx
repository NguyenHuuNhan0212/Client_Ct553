import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  DatePicker,
  Button,
  Tag,
  Divider,
  Space,
  Select,
  Typography
} from 'antd';
import {
  CalendarOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SaveOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
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
      title={
        <>
          {' '}
          <Title level={2} style={{ color: '#06b6d4' }}>
            <CalendarOutlined /> Lên kế hoạch cho chuyến đi của bạn
          </Title>
          <Text type='secondary'>
            <CarOutlined /> Hãy bắt đầu hành trình của bạn! Chỉ vài bước để tạo
            lịch trình hoàn hảo.{' '}
          </Text>
        </>
      }
      extra={
        <Button type='primary' onClick={handleSave}>
          <SaveOutlined /> Lưu lịch trình
        </Button>
      }
      style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Text strong>Tên lịch trình (VD: Khám phá Cần Thơ 3 ngày)</Text>
        <Input
          placeholder='Nhập tên lịch trình...'
          size='large'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Text strong>Chọn địa điểm đến</Text>

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
        <Text strong>Tên người tạo (NickName)</Text>

        <Input
          placeholder='Nhập tên người tạo.'
          size='large'
          value={form.creatorName}
          onChange={(e) => setForm({ ...form, creatorName: e.target.value })}
        />
        <Text strong>Ngày dự kiến</Text>

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
