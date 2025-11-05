import {
  DollarOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { Card, Space, Tag, Typography, Divider, Tooltip, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

function PlaceInfoDetail({ p }) {
  const navigate = useNavigate();
  const urlDetail = p.type === 'hotel' ? `/hotel/${p._id}` : `/place/${p._id}`;
  return (
    <Card
      hoverable
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.25s ease',
        maxWidth: 700,
        margin: '0 auto'
      }}
      styles={{ body: { padding: '20px 24px' } }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      cover={
        <img
          src={`http://localhost:3000/${p.image}`}
          alt={p.name}
          style={{
            width: '100%',
            height: 300,
            objectFit: 'cover'
          }}
        />
      }
    >
      <Space direction='vertical' size='small' style={{ width: '100%' }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          {p.name}
        </Title>

        <Text type='secondary'>
          <EnvironmentOutlined /> {p.address || 'Địa chỉ chưa cập nhật'}
        </Text>

        <Divider style={{ margin: '0' }} />

        <div dangerouslySetInnerHTML={{ __html: p.description }} />
        {p.hotelDetail && (
          <>
            <Divider style={{ margin: '0' }} />
            <Title level={5} style={{ marginBottom: 8 }}>
              Các loại phòng
            </Title>
            <Space wrap>
              {p.hotelDetail.roomTypes.map((rt, idx) => (
                <Tooltip
                  title={`Gía ${rt.pricePerNight.toLocaleString()}/đêm`}
                  key={idx}
                >
                  <Tag color='purple' icon={<CheckCircleOutlined />}>
                    {rt.name}
                  </Tag>
                </Tooltip>
              ))}
            </Space>
          </>
        )}
        {p.services && p.services.length > 0 && (
          <>
            <Divider style={{ margin: '0' }} />
            <Title level={5} style={{ marginBottom: 8 }}>
              Dịch vụ nổi bật
            </Title>
            <Space wrap>
              {p.services.map((service, idx) => (
                <Tooltip title={service.name} key={idx}>
                  <Tag color='blue' icon={<CheckCircleOutlined />}>
                    {service.name}
                  </Tag>
                </Tooltip>
              ))}
            </Space>
          </>
        )}
        <Button type='link' size='small' onClick={() => navigate(urlDetail)}>
          <LinkOutlined /> Xem chi tiết
        </Button>
      </Space>
    </Card>
  );
}

export default PlaceInfoDetail;
