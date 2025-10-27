import {
  EnvironmentOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, message, Row, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import userApi from '../../../apis/userService';
import placeApi from '../../../apis/placeService';
const { Text } = Typography;
function Overview() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalProvider, setTotalProvider] = useState(0);
  const [totalPlace, setTotalPlace] = useState(0);
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
        message.error(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Card>
          <Statistic
            title={
              <Text strong type='secondary'>
                Tổng số người dùng
              </Text>
            }
            valueStyle={{ color: '#3f8600', fontWeight: 600 }}
            prefix={<UserOutlined />}
            value={totalUser}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Card>
          <Statistic
            title={
              <Text strong type='secondary'>
                Tổng số nhà cung cấp
              </Text>
            }
            valueStyle={{ color: '#019c7dff', fontWeight: 600 }}
            prefix={<ShopOutlined />}
            value={totalProvider}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Card>
          <Statistic
            title={
              <Text strong type='secondary'>
                Tổng số địa điểm
              </Text>
            }
            valueStyle={{ color: '#115aa3ff', fontWeight: 600 }}
            prefix={<EnvironmentOutlined />}
            value={totalPlace}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default Overview;
