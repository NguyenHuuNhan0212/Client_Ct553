import { DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Card, Col, Row, Space, Tag, Tooltip, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;
function PlaceInfo({ p }) {
  const navigate = useNavigate();
  const urlDetail = p.type === 'hotel' ? `/hotel/${p._id}` : `/place/${p._id}`;
  return (
    <Card
      key={p._id}
      hoverable
      style={{
        borderRadius: 12,
        transition: 'transform 0.2s ease'
      }}
      styles={{ body: { padding: '16px 20px' } }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Row gutter={10}>
        <Col
          span={8}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20
          }}
        >
          <img
            src={`http://localhost:3000/${p.image}`}
            style={{ width: 90, height: 90 }}
            alt={p.name}
          />
          <Tooltip title={'Nhấn để xem chi tiết'}>
            <Tag
              color='#108ee9'
              onClick={() => navigate(urlDetail)}
              style={{
                width: '100%',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Xem chi tiết
            </Tag>
          </Tooltip>
        </Col>
        <Col span={16}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Title level={5} style={{ margin: 0 }}>
              {p.name}
            </Title>
            <Text type='secondary'>
              <EnvironmentOutlined /> {p.address || 'Địa chỉ chưa có'}
            </Text>
            {p.description && (
              <div dangerouslySetInnerHTML={{ __html: p.description }} />
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

export default PlaceInfo;
