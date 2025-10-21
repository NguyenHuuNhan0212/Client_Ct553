// src/pages/Revenue.jsx
import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography } from 'antd';
import { DollarOutlined, ShopOutlined } from '@ant-design/icons';
import RevenueChart from '../../components/RevenueChart/RevenueChart';

const { Title } = Typography;

const Revenue = () => {
  const revenueSummary = {
    totalRevenue: 154_000_000,
    totalBookings: 320,
    totalPlaces: 5
  };

  const monthlyRevenue = [
    { month: 'Jan', revenue: 10000000 },
    { month: 'Feb', revenue: 15000000 },
    { month: 'Mar', revenue: 18000000 },
    { month: 'Apr', revenue: 25000000 },
    { month: 'May', revenue: 22000000 },
    { month: 'Jun', revenue: 19000000 }
  ];

  const placeRevenue = [
    { key: 1, name: 'Villa Biển Đà Nẵng', revenue: 58000000, bookings: 120 },
    { key: 2, name: 'Homestay Đà Lạt', revenue: 34000000, bookings: 85 },
    { key: 3, name: 'Resort Phú Quốc', revenue: 41000000, bookings: 96 },
    { key: 4, name: 'Căn hộ Nha Trang', revenue: 21000000, bookings: 45 }
  ];

  const columns = [
    { title: 'Địa điểm', dataIndex: 'name', key: 'name' },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => value.toLocaleString('vi-VN') + ' ₫'
    },
    { title: 'Lượt đặt', dataIndex: 'bookings', key: 'bookings' }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>📊 Tổng quan doanh thu</Title>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Tổng doanh thu'
              value={revenueSummary.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix='₫'
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Tổng lượt đặt'
              value={revenueSummary.totalBookings}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Số địa điểm đang hoạt động'
              value={revenueSummary.totalPlaces}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <RevenueChart data={monthlyRevenue} />
      </Card>

      <Card title='Doanh thu theo địa điểm' style={{ marginTop: 24 }}>
        <Table columns={columns} dataSource={placeRevenue} pagination={false} />
      </Card>
    </div>
  );
};

export default Revenue;
