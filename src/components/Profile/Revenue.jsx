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
  Spin,
  DatePicker,
  Space,
  Button
} from 'antd';
import { DollarOutlined, ShopOutlined } from '@ant-design/icons';
import bookingApi from '../../apis/bookingService';
import DateFilter from './RevenueChart/DateFilter';
import RevenueByLocationChart from './RevenueChart/RevenueByLocationLineChart';
import dayjs from 'dayjs';
import RevenueByLocationBarChart from './RevenueChart/RevenueByLocationBarChart';

const { Title, Text } = Typography;

const Revenue = () => {
  const [revenueSummary, setRevenueSummary] = useState({});
  const [isLoadingLine, setIsLoadingLine] = useState(false);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [filter, setFilter] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [date, setDate] = useState(null);
  const [dailyData, setDailyData] = useState(null);

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
  const fetchRevenue = async (from, to) => {
    setIsLoadingLine(true);
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
      setChartData({
        labels: months.map((m) => `Tháng ${m}`),
        datasets
      });
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoadingLine(false);
    }
  };
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;

  const fetchRevenueByDate = async (date) => {
    setIsLoadingBar(true);
    try {
      const res = await bookingApi.getRevenueByDate({ date });

      const labels = res?.map((r) => r.location);
      const values = res?.map((r) => r.totalRevenue);

      const colors = labels?.map(() => randomColor());
      setDailyData({
        labels: labels,
        datasets: [
          {
            label: 'Doanh thu (VNĐ)',
            data: values,
            backgroundColor: colors
          }
        ]
      });
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoadingBar(false);
    }
  };
  useEffect(() => {
    if (filter) {
      if (dayjs(filter.to).isAfter(dayjs())) {
        filter.to = dayjs();
      }
      fetchRevenue(filter.from, filter.to);
    }
  }, [filter]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await bookingApi.getStats();
      setRevenueSummary(res);
    };
    fetchData();
    fetchRevenue();
    fetchRevenueByDate();
  }, []); //eslint-disable-line
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
      {revenueSummary?.revenueByPlace?.length > 0 && (
        <>
          <Row gutter={16} style={{ display: 'flex' }}>
            <Col span={12} style={{ display: 'flex' }}>
              {isLoadingLine ? (
                <Spin />
              ) : (
                <Card
                  style={{
                    marginTop: 24,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <DateFilter onChange={setFilter} />
                  {filter && (
                    <div style={{ textAlign: 'center' }}>
                      <Text strong>
                        Doanh thu từ {dayjs(filter?.from).format('MM-YYYY')} -{' '}
                        {dayjs(filter?.to).format('MM-YYYY')}
                      </Text>
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <RevenueByLocationChart data={chartData} />
                  </div>
                </Card>
              )}
            </Col>

            <Col span={12} style={{ display: 'flex' }}>
              {isLoadingBar ? (
                <Spin />
              ) : (
                <Card
                  style={{
                    marginTop: 24,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Space style={{ width: '100%', textAlign: 'center' }}>
                    <Text disabled style={{ fontWeight: 600 }}>
                      Chọn ngày:{' '}
                    </Text>

                    <DatePicker
                      allowClear={false}
                      value={date ? dayjs(date) : null}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf('day')
                      }
                      onChange={(value) => {
                        const formatted = dayjs(value).format('YYYY-MM-DD');
                        setDate(formatted);
                        fetchRevenueByDate(formatted);
                      }}
                    />
                    <Button
                      color='primary'
                      variant='outlined'
                      onClick={() => {
                        setDate(null);
                        fetchRevenueByDate();
                      }}
                    >
                      Xem tất cả
                    </Button>
                  </Space>
                  {date && (
                    <div style={{ textAlign: 'center' }}>
                      <Text strong>
                        Doanh thu ngày {dayjs(date).format('DD-MM-YYYY')}
                      </Text>
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <RevenueByLocationBarChart data={dailyData} />
                  </div>
                </Card>
              )}
            </Col>
          </Row>

          <Card
            title='Tổng doanh thu theo địa điểm'
            style={{ marginTop: 24, textAlign: 'center' }}
          >
            <Table
              columns={columns}
              dataSource={revenueSummary?.revenueByPlace}
              pagination={false}
              rowKey={(record) => record.placeId}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Revenue;
