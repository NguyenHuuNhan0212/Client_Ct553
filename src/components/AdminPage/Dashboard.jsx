import { Card, Col, Divider, Row, Typography } from 'antd';
import Overview from './DashboardComponents/Overview';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; //eslint-disable-line
import ListPlace from './DashboardComponents/ListPlace';
import ListUser from './DashboardComponents/ListUser';
import { AlertOutlined } from '@ant-design/icons';
import statsApi from '../../apis/statsService';
import PieChartPlaceType from './DashboardComponents/Chart/PieChartPlaceType';
import LineChartNewUsers from './DashboardComponents/Chart/LineChartNewUsers';
import TopPopularPlacesChart from './DashboardComponents/Chart/BarChartPlacesPopular';
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
  const [users, setUsers] = useState([]);
  const [dataStatsPlaceByType, setDataStatsPlaceByType] = useState([]);
  const [dataStatsNewUses, setDataStatsNewUsers] = useState([]);
  const [dataStatsFivePlacesPopular, setDataStatsFivePlacesPopular] = useState(
    []
  );
  const [
    dataStatsFivePlacesHaveInItinerary,
    setDataStatsFivePlacesHaveInItinerary
  ] = useState([]);
  const dataPieChartPlaceByType = dataStatsPlaceByType?.map((item) => ({
    name: item._id,
    value: item.totalPlaces
  }));

  const dataLineChartNewUsers = dataStatsNewUses?.map((item) => ({
    date: item._id,
    newUsers: item.totalUsers
  }));

  const dataBarChartPlacesPopular = dataStatsFivePlacesPopular?.map((item) => ({
    name: item.name,
    value: item.bookingCount
  }));
  const dataBarChartPlacesItinerary = dataStatsFivePlacesHaveInItinerary?.map(
    (item) => ({
      name: item.name,
      value: item.total
    })
  );
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
        setUsers(res.usersUpgrade);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getStatsPlaceByType();
        setDataStatsPlaceByType(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy thống kê địa điểm theo loại.');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getUsersSevenDaysNewest();
        setDataStatsNewUsers(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy thống kê người dùng theo vai trò.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getFivePlacesPopular();
        setDataStatsFivePlacesPopular(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy thống kê 5 địa điểm phổ biến.');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getFivePlacesHaveInItinerary();
        setDataStatsFivePlacesHaveInItinerary(res);
      } catch (err) {
        console.log(
          err.message ||
            'Lỗi lấy thống kê 5 địa điểm có trong lịch trình nhiều nhất.'
        );
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
        <Title level={2}>
          Chào mừng trở lại, {user?.fullName || 'Quản trị viên'}
        </Title>
        {(totalAwaitApprove !== 0 || totalUpgrade !== 0) && (
          <Text type='danger' italic>
            <AlertOutlined /> Hôm nay bạn có
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
        <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
          <Col xs={24} md={12} lg={12}>
            <PieChartPlaceType data={dataPieChartPlaceByType} />
          </Col>
          <Col xs={24} md={12} lg={12}>
            <LineChartNewUsers data={dataLineChartNewUsers} />
          </Col>
        </Row>
        <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
          <Col xs={24} md={12} lg={12}>
            <TopPopularPlacesChart
              data={dataBarChartPlacesPopular}
              title={'Top 5 địa điểm có đơn đặt nhiều nhất'}
              unit={'lượt đặt'}
            />
          </Col>
          <Col xs={24} md={12} lg={12}>
            <TopPopularPlacesChart
              data={dataBarChartPlacesItinerary}
              title={'Top 5 địa điểm có trong lịch trình nhiều nhất'}
              unit={'lịch trình'}
            />
          </Col>
        </Row>

        <>
          <Divider />
          <Title level={3}>Danh sách địa điểm chờ phê duyệt</Title>
          <ListPlace
            places={placesAwaitingApprove}
            setPlacesAwaitingApprove={setPlacesAwaitingApprove}
            onSetAwaitApprove={onSetAwaitApprove}
          />
        </>

        <>
          <Divider />
          <Title level={3}>Danh sách tài khoản chờ nâng cấp</Title>
          <ListUser
            users={users}
            setUsers={setUsers}
            onSetUpgrade={onSetUpgrade}
          />
        </>
        <Divider />
      </Card>
    </motion.div>
  );
}

export default Dashboard;
