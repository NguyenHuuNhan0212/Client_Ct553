import { Card, Typography, Space } from 'antd';
import PlaceInfo from './PlaceInfo';

const { Title, Text, Paragraph } = Typography;

function RenderPlaces({ msg }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        {msg.placeType} nổi bật tại {msg.city}
      </Title>

      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        {msg.data.map((p) => (
          <PlaceInfo p={p} />
        ))}
      </Space>
    </div>
  );
}

export default RenderPlaces;
