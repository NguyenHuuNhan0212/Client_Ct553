import { Card, Divider, Typography } from 'antd';
import Overview from './DashboardComponents/Overview';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; //eslint-disable-line
import ListPlaceAwaitingApprove from './DashboardComponents/ListPlaceAwaitingApprove';
const { Title, Text } = Typography;
function Dashboard({
  totalUpgrade,
  totalAwaitApprove,
  onSetUpgrade,
  onSetAwaitApprove
}) {
  const { user } = useSelector((state) => state.user);
  const [totalUser, setTotalUser] = useState(0);
  const [totalProvider, setTotalProvider] = useState(0);
  const [totalPlace, setTotalPlace] = useState(0);
  const [placesAwaitingApprove, setPlacesAwaitingApprove] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await userApi.getStatsUser();
        const resPlace = await placeApi.getStatsPlace();
        setTotalPlace(resPlace.totalPlace);
        if (resUser?.userGroupByRole && resUser?.userGroupByRole?.length > 0) {
          if (resUser.userGroupByRole[0]._id === 'user') {
            setTotalUser(resUser.userGroupByRole[0]?.totalUser || 0);
            setTotalProvider(resUser.userGroupByRole[1]?.totalUser || 0);
          } else {
            setTotalProvider(resUser.userGroupByRole[0]?.totalUser || 0);
            setTotalUser(resUser.userGroupByRole[1]?.totalUser || 0);
          }
        }
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy stats user');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getQuantityAccountAwaitConfirm();
        onSetUpgrade(res.total);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy số lượng tài khoản chờ duyệt.');
      }
    };
    fetchData();
  }, [onSetUpgrade]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await placeApi.getPlacesAwaitApprove();
        setPlacesAwaitingApprove(res.places);
        onSetAwaitApprove(res.total);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy số lượng địa điểm chờ duyệt.');
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
        {(totalAwaitApprove !== 0 || totalUpgrade !== 0) && (
          <Text type='danger' italic>
            Hôm nay bạn có
            {totalUpgrade !== 0 && ` ${totalUpgrade} nhà cung cấp `}{' '}
            {totalAwaitApprove !== 0 && ` ${totalAwaitApprove} địa điểm`} đang
            chờ duyệt.
          </Text>
        )}
        <Overview
          totalUser={totalUser}
          totalPlace={totalPlace}
          totalProvider={totalProvider}
        />
        <Divider />
        <Title level={3}>Danh sách địa điểm chờ duyệt</Title>
        <ListPlaceAwaitingApprove
          places={placesAwaitingApprove}
          setPlaces={setPlacesAwaitingApprove}
          onSetAwaitApprove={onSetAwaitApprove}
        />
      </Card>
    </motion.div>
  );
}

export default Dashboard;
