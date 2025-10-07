import { Card, Typography, Tag, Space } from 'antd';
import {
  ClockCircleOutlined,
  StopOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

function CancelPolicy() {
  return (
    <Card
      style={{
        borderRadius: 10,
        marginTop: 40,
        background: '#fafafa',
        padding: '20px 30px'
      }}
      title={
        <Title
          level={4}
          style={{
            margin: 0,
            color: '#1677ff',
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          Chính sách hủy & hoàn tiền
        </Title>
      }
      variant='borderless'
    >
      <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <div>
            <Tag color='blue' icon={<ClockCircleOutlined />}>
              Trong vòng 1 tiếng sau khi tạo đơn
            </Tag>
            <Text>
              : Người dùng có thể <Text strong>hủy đơn</Text>{' '}
              <CloseCircleOutlined
                style={{ color: 'red', cursor: 'pointer' }}
              />{' '}
              và nếu đã thanh toán, sẽ được{' '}
              <Text strong style={{ color: '#52c41a' }}>
                hoàn tiền 100%
              </Text>
              .
            </Text>
          </div>

          <div>
            <Tag color='red' icon={<StopOutlined />}>
              Sau 1 tiếng kể từ khi tạo đơn
            </Tag>
            <Text>
              : Không thể hoàn tiền. Vui lòng liên hệ bộ phận{' '}
              <Text underline>hỗ trợ</Text> nếu có sự cố đặc biệt.
            </Text>
          </div>

          <div>
            <Tag color='green' icon={<CheckCircleOutlined />}>
              Đơn chưa thanh toán
            </Tag>
            <Text>
              : Người dùng có thể <Text strong>hủy đơn bất cứ lúc nào</Text> nếu
              chưa thanh toán. Tuy nhiên, vui lòng{' '}
              <Text strong style={{ color: '#faad14' }}>
                hạn chế việc hủy thường xuyên
              </Text>{' '}
              để đảm bảo uy tín và giúp hệ thống hoạt động ổn định.
            </Text>
          </div>
        </Space>
      </Paragraph>

      <Paragraph
        style={{
          fontStyle: 'italic',
          color: '#888',
          textAlign: 'center',
          marginTop: 10
        }}
      >
        * Chính sách được áp dụng nhằm đảm bảo quyền lợi cho cả khách hàng và
        đối tác cung cấp dịch vụ.
      </Paragraph>
    </Card>
  );
}

export default CancelPolicy;
