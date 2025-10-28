import {
  EnvironmentOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
const { Text } = Typography;
function Overview({ totalUser, totalPlace, totalProvider }) {
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
