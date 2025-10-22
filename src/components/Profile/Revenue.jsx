// src/pages/Revenue.jsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Typography } from 'antd';
import { DollarOutlined, ShopOutlined } from '@ant-design/icons';
import RevenueChart from './RevenueChart/RevenueChart';
import bookingApi from '../../apis/bookingService';

const { Title } = Typography;

const Revenue = () => {
  const [revenueSummary, setRevenueSummary] = useState({});

  const monthlyRevenue = [
    { month: 'Jan', revenue: 10000000 },
    { month: 'Feb', revenue: 15000000 },
    { month: 'Mar', revenue: 18000000 },
    { month: 'Apr', revenue: 25000000 },
    { month: 'May', revenue: 22000000 },
    { month: 'Jun', revenue: 19000000 }
  ];

  const columns = [
    { title: 'Địa điểm', dataIndex: 'placeName', key: 'name' },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'revenue',
      render: (value) => value.toLocaleString() + ' VNĐ'
    },
    { title: 'Lượt đặt', dataIndex: 'totalBookings', key: 'bookings' }
  ];
  useEffect(() => {
    const fetchData = async () => {
      const res = await bookingApi.getStats();
      setRevenueSummary(res);
    };
    fetchData();
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <Title level={1} style={{ textAlign: 'center' }}>
        Tổng quan doanh thu
      </Title>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Tổng doanh thu'
              value={revenueSummary.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix='VNĐ'
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
        <Table
          columns={columns}
          dataSource={revenueSummary?.revenueByPlace}
          pagination={false}
          rowKey={(record) => record.placeId}
        />
      </Card>
    </div>
  );
};

export default Revenue;
