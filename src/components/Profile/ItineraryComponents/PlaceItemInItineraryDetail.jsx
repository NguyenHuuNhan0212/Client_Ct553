import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Space, Tooltip, Typography } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;
function PlaceItineraryDetail({ place }) {
  return (
    <Link
      to={
        place.placeId?.type === 'hotel'
          ? `/hotel/${place?.placeId?._id}`
          : `/place/${place?.placeId?._id}`
      }
    >
      <Tooltip title={'Nhấn để xem chi tiết địa điểm'}>
        <Card
          hoverable
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            borderRadius: 10,
            overflow: 'hidden'
          }}
          styles={{ body: { padding: '12px 16px' } }}
        >
          <Row gutter={32}>
            <Col span={8}>
              <img
                src={`http://localhost:3000/${place.images[0]}`}
                alt={place.name}
                style={{
                  width: 140,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 8
                }}
              />
            </Col>
            <Col
              span={16}
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Title level={5} style={{ marginTop: -3 }}>
                {place.name}
              </Title>
              <Space size='small' align='center' style={{ marginBottom: 6 }}>
                <EnvironmentOutlined style={{ color: '#52c41a' }} />
                <Text type='secondary'>{place.address}</Text>
              </Space>
              <Space>
                <ClockCircleOutlined style={{ color: '#f6971bff' }} />
                <Text type='secondary'>{place.duration}</Text>
              </Space>

              {place.note && (
                <Text type='secondary'>
                  <InfoCircleOutlined
                    style={{ color: '#1677ff', marginRight: 6 }}
                  />
                  {place.note}
                </Text>
              )}
            </Col>
          </Row>
        </Card>
      </Tooltip>
    </Link>
  );
}

export default PlaceItineraryDetail;
