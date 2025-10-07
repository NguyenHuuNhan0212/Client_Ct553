import { Card, Radio, Typography, Space, Tag } from 'antd';
import {
  DollarCircleOutlined,
  CreditCardOutlined,
  WalletOutlined
} from '@ant-design/icons';

const { Text } = Typography;

function PaymentMethodSelect({ value, onChange }) {
  const options = [
    {
      value: 'offline',
      label: (
        <Space align='start' direction='vertical'>
          <Space>
            <WalletOutlined style={{ color: '#1677ff', fontSize: 18 }} />
            <Text strong>Thanh toán khi đến địa điểm</Text>
          </Space>
          <Text type='secondary'>
            Bạn sẽ thanh toán toàn bộ khi sử dụng dịch vụ trực tiếp.
          </Text>
        </Space>
      )
    },
    {
      value: 'deposit',
      label: (
        <Space align='start' direction='vertical'>
          <Space>
            <CreditCardOutlined style={{ color: '#faad14', fontSize: 18 }} />
            <Text strong>Thanh toán một phần (30%)</Text>
            <Tag color='orange'>Khuyến khích</Tag>
          </Space>
          <Text type='secondary'>
            Giữ chỗ nhanh với khoản đặt cọc 30%. Phần còn lại sẽ trả sau.
          </Text>
        </Space>
      )
    },
    {
      value: 'full',
      label: (
        <Space align='start' direction='vertical'>
          <Space>
            <DollarCircleOutlined style={{ color: '#52c41a', fontSize: 18 }} />
            <Text strong>Thanh toán toàn bộ</Text>
          </Space>
          <Text type='secondary'>
            Thanh toán trước toàn bộ giúp xác nhận đơn hàng ngay lập tức.
          </Text>
        </Space>
      )
    }
  ];

  return (
    <Card
      title={
        <Text strong style={{ fontSize: 16, color: '#1677ff' }}>
          Chọn hình thức thanh toán
        </Text>
      }
      bordered={false}
      style={{
        background: '#fafafa',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <Radio.Group
        onChange={(e) => onChange(e.target.value)}
        value={value}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15
        }}
      >
        {options.map((opt) => (
          <Card
            key={opt.value}
            hoverable
            style={{
              background: value === opt.value ? '#e6f4ff' : 'white',
              borderColor: value === opt.value ? '#1677ff' : '#f0f0f0',
              borderRadius: 10,
              transition: 'all 0.2s ease-in-out'
            }}
            bodyStyle={{ padding: '10px 16px' }}
            onClick={() => onChange(opt.value)}
          >
            <Radio value={opt.value}>{opt.label}</Radio>
          </Card>
        ))}
      </Radio.Group>
    </Card>
  );
}

export default PaymentMethodSelect;
