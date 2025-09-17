import { Card, Empty } from 'antd';
function Payment() {
  return (
    <Card
      variant='borderless'
      style={{ borderRadius: 10, padding: 60, textAlign: 'center' }}
    >
      <Empty description='Lịch sử thanh toán sẽ hiển thị ở đây.' />
    </Card>
  );
}

export default Payment;
