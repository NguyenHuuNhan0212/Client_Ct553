import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Space,
  Spin,
  Typography
} from 'antd';
import OverviewTransaction from './TransactionComponents/Overview';
import { motion } from 'motion/react'; // eslint-disable-line
import { useEffect, useState } from 'react';
import paymentApi from '../../apis/paymentService';
import ListTransaction from './TransactionComponents/ListTransaction';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BarChartTwo from './TransactionComponents/BarChartTwoData';
import statsApi from '../../apis/statsService';
const { Title, Text } = Typography;
function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('Tất cả giao dịch');
  const [revenues, setRevenues] = useState([]);
  const filteredTransactions = transactions.filter((t) => {
    const matchKeyword = value
      ? t.userBooking?.toLowerCase().includes(value.toLowerCase())
      : true;

    const matchDate = date
      ? dayjs(t?.paymentDate).isSame(dayjs(date, 'DD/MM/YYYY'), 'day')
      : true;
    return matchKeyword && matchDate;
  });
  const dataBarChart = revenues.map((r) => ({
    name: `Tháng ${r._id.month}-${r._id.year}`,
    valueTotalTransaction: r.totalTransaction,
    valueTotalRevenue: r.totalRevenue
  }));
  const onChangeKeyWord = (e) => {
    setValue(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };
  const handleGetAllTransactionCancelled = async () => {
    setDate(null);
    setValue('');
    setIsLoading(true);
    setTitle('Giao dịch bị hủy / hoàn tiền');
    try {
      const res = await paymentApi.getAllTransactionCancelled();
      setTransactions(res.transactions);
    } catch (err) {
      console.log(err.message || 'Lỗi khi lấy giao dịch bị hủy');
    } finally {
      setIsLoading(false);
    }
  };
  const showAll = async () => {
    setDate(null);
    setValue('');
    setIsLoading(true);
    setTitle('Tất cả giao dịch');
    try {
      const res = await paymentApi.getAllTransaction();
      setTransactions(res.transactions);
    } catch (err) {
      console.log(err.message || 'Lỗi khi lấy dữ liệu transactions');
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetAllTransactionSuccess = async () => {
    setDate(null);
    setValue('');
    setIsLoading(true);
    setTitle('Giao dịch thành công');
    try {
      const res = await paymentApi.getAllTransactionSuccess();
      setTransactions(res.transactions);
    } catch (err) {
      console.log(err.message || 'Lỗi khi lấy giao dịch thành công');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await paymentApi.getAllTransaction();
        setTransactions(res.transactions);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy dữ liệu transactions');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getStatsRevenueChart();
        setRevenues(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy thống kê doanh thu.');
      }
    };
    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginTop: 5 }}>
          Quản lý giao dịch
        </Title>
        <OverviewTransaction />

        <Row gutter={[10, 10]}>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}>
              <BarChartTwo
                data={dataBarChart}
                title={'Thống kê doanh thu và giao dịch'}
                unitTransaction={'giao dịch'}
                unitRevenue={'doanh thu'}
              />
            </div>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}></div>
          </Col>
        </Row>
        <div style={{ marginLeft: 10 }}>
          <Text type='secondary' style={{ fontSize: 12 }}>
            Cập nhật: {dayjs().format('DD/MM/YYYY HH:mm')}
          </Text>
        </div>
        <Divider />
        <Title level={3}>Danh sách chi tiết giao dịch</Title>
        <div
          style={{
            display: 'flex',
            marginBottom: 15,
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Button type='primary' onClick={() => showAll()}>
              Tất cả giao dịch
            </Button>
            <Button
              color='cyan'
              variant='outlined'
              onClick={() => handleGetAllTransactionSuccess()}
            >
              Giao dịch thành công
            </Button>{' '}
            <Button
              color='danger'
              variant='outlined'
              onClick={() => handleGetAllTransactionCancelled()}
            >
              Giao dịch bị hủy
            </Button>
          </div>
          <div>
            <Space>
              <Input
                style={{ width: 250 }}
                placeholder='Tìm kiếm theo tên người đặt...'
                prefix={<SearchOutlined />}
                value={value}
                allowClear
                onChange={(e) => onChangeKeyWord(e)}
              />
              <DatePicker
                format={{
                  format: 'DD-MM-YYYY',
                  type: 'mask'
                }}
                disabledDate={(current) => current > dayjs().endOf('day')}
                placeholder='Chọn ngày'
                onChange={onChangeDate}
              />
            </Space>
          </div>
        </div>
        <Text type='secondary'>{title}</Text>
        <div style={{ position: 'relative' }}>
          <Spin spinning={isLoading}>
            <ListTransaction transactions={filteredTransactions} />
          </Spin>
        </div>

        <div style={{ textAlign: 'right', marginRight: 10 }}>
          <Space>
            <Text type='secondary'>Tổng số giao dịch:</Text>
            <Text strong>{filteredTransactions.length || 0}</Text>
          </Space>
        </div>
      </Card>
    </motion.div>
  );
}

export default Transaction;
