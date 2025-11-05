import {
  BankOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  TransactionOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import statsApi from '../../../apis/statsService';
const { Text } = Typography;
function OverviewTransaction() {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalTransactionsRefunded, setTotalTransactionsRefunded] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getStatsRevenueAndTransaction();
        setTotalTransactions(res.totalTransactions);
        setTotalRevenues(res.totalRevenues);
        setTotalTransactionsRefunded(res.totalTransactionsRefunded);
      } catch (err) {
        console.log(err?.message || 'Lỗi khi lấy thống kê doanh thu');
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card>
            <Statistic
              title={
                <Text strong type='secondary'>
                  Tổng số giao dịch
                </Text>
              }
              valueStyle={{ color: '#3f8600', fontWeight: 600 }}
              prefix={<TransactionOutlined />}
              value={totalTransactions}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card>
            <Statistic
              title={
                <Text strong type='secondary'>
                  Tổng số giao dịch hủy / hoàn tiền
                </Text>
              }
              valueStyle={{ color: '#ef2121ff', fontWeight: 600 }}
              prefix={<TransactionOutlined />}
              value={totalTransactionsRefunded}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card>
            <Statistic
              title={
                <Text strong type='secondary'>
                  Tổng số doanh thu
                </Text>
              }
              valueStyle={{ color: '#019c7dff', fontWeight: 600 }}
              prefix={<DollarOutlined />}
              value={totalRevenues}
              suffix='VNĐ'
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OverviewTransaction;
