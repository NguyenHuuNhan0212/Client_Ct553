// src/pages/Revenue.jsx
import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Typography,
  message,
  Spin
} from 'antd';
import { DollarOutlined, ShopOutlined } from '@ant-design/icons';
import bookingApi from '../../apis/bookingService';
import DateFilter from './RevenueChart/DateFilter';
import RevenueByLocationChart from './RevenueChart/RevenueByLocationChart';
import dayjs from 'dayjs';

const { Title } = Typography;

const Revenue = () => {
  const [revenueSummary, setRevenueSummary] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState(null);

  const fetchRevenue = async (from, to) => {
    setIsLoading(true);
    try {
      const res = await bookingApi.getRevenueByLocation({ from, to });
      const raw = res;
      const months = [...new Set(raw.map((m) => m.month))].sort(
        (a, b) => a - b
      );
      const locations = [...new Set(raw.map((l) => l.location))];
      const datasets = locations.map((loc, idx) => {
        return {
          label: loc,
          data: months.map((m) => {
            const item = raw.find((i) => i.month === m && i.location === loc);
            return item ? item.totalRevenue : 0;
          }),
          borderColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#9966FF'][idx % 4],
          tension: 0.3
        };
      });
      setData({
        labels: months.map((m) => `Tháng ${m}`),
        datasets
      });
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const chartData = data ? data : { labels: [], datasets: [] };
  useEffect(() => {
    if (filter) {
      if (dayjs(filter.to).isAfter(dayjs())) {
        filter.to = dayjs();
      }
      fetchRevenue(filter.from, filter.to);
    }
  }, [filter]);

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
    fetchRevenue();
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
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <DateFilter onChange={setFilter} />
            <RevenueByLocationChart data={chartData} />{' '}
          </>
        )}
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
