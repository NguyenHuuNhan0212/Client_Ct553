import { Card, Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
function Itinerary() {
  return (
    <Card
      variant='borderless'
      style={{ borderRadius: 10, textAlign: 'center', padding: 60 }}
    >
      <Empty description='Bạn chưa có lịch trình nào.' />
      <Button type='primary' icon={<PlusOutlined />} style={{ marginTop: 20 }}>
        Tạo lịch trình mới
      </Button>
    </Card>
  );
}

export default Itinerary;
