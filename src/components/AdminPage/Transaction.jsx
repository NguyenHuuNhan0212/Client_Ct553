import { Card, Divider, Typography } from 'antd';
import OverviewTransaction from './TransactionComponents/Overview';
import { motion } from 'motion/react'; // eslint-disable-line
import { useEffect, useState } from 'react';
import paymentApi from '../../apis/paymentService';
import ListTransaction from './TransactionComponents/ListTransaction';
const { Title } = Typography;
function Transaction() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await paymentApi.getAllTransaction();
        setTransactions(res.transactions);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy dữ liệu transactions');
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
        <Divider />
        <Title level={3}>Danh sách chi tiết giao dịch</Title>
        <ListTransaction transactions={transactions} />
      </Card>
    </motion.div>
  );
}

export default Transaction;
