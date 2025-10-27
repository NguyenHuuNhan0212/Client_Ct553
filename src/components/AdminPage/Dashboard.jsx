import { Card, message, Typography } from 'antd';
import Overview from './DashboardComponents/Overview';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; //eslint-disable-line
const { Title, Text } = Typography;
function Dashboard({ onSetUpgrade, onSetAwaitApprove }) {
  const { user } = useSelector((state) => state.user);
  const [totalUserAwaitConfirm, setTotalUserAwaitConfirm] = useState(0);
  const [totalPlacesAwaitApprove, setTotalPlacesAwaitApprove] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getQuantityAccountAwaitConfirm();
        setTotalUserAwaitConfirm(res.total);
        onSetUpgrade(res.total);
      } catch (err) {
        message.error(err.message || 'Lỗi lấy số lượng tài khoản chờ duyệt.');
      }
    };
    fetchData();
  }, [onSetUpgrade]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await placeApi.getPlacesAwaitApprove();
        setTotalPlacesAwaitApprove(res.total);
        onSetAwaitApprove(res.total);
      } catch (err) {
        message.error(err.message || 'Lỗi lấy số lượng địa điểm chờ duyệt.');
      }
    };
    fetchData();
  }, [onSetAwaitApprove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card>
        <Title level={2}>
          Chào mừng trở lại, {user?.fullName || 'Quản trị viên'}
        </Title>
        {(totalPlacesAwaitApprove !== 0 || totalUserAwaitConfirm !== 0) && (
          <Text type='danger' italic>
            Hôm nay bạn có
            {totalUserAwaitConfirm !== 0 &&
              ` ${totalUserAwaitConfirm} nhà cung cấp `}{' '}
            {totalPlacesAwaitApprove !== 0 &&
              ` ${totalPlacesAwaitApprove} địa điểm`}{' '}
            đang chờ duyệt.
          </Text>
        )}

        <Overview />
      </Card>
    </motion.div>
  );
}

export default Dashboard;
