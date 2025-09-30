import { Card } from 'antd';

export default function DestinationCard({ name, image }) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 10,
        overflow: 'hidden'
      }}
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 180, objectFit: 'cover' }}
        />
      }
    >
      <h3 style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
        {name}
      </h3>
    </Card>
  );
}
