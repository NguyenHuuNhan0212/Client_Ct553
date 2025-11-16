import {
  EditOutlined,
  RobotOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import Message from './Message';
import MessageByPlace from './Message/MessageByPlace';

const { Title, Text } = Typography;
function MessageOptionChoice() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      {!selectedOption ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ marginBottom: 8 }}>
              Chọn vai trò
            </Title>
            <Text type='secondary'>
              Hãy chọn vai trò phù hợp để bắt đầu cuộc trò chuyện của bạn
            </Text>
          </div>
          <Row gutter={[20, 20]} justify='center'>
            <Col xs={24} sm={12}>
              <Card
                hoverable
                onClick={() => setSelectedOption('user')}
                style={{
                  borderRadius: 12,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                styles={{ body: { padding: 24 } }}
              >
                <Space direction='vertical' align='center'>
                  <UserOutlined
                    style={{
                      fontSize: 36,
                      color: '#1677ff',
                      backgroundColor: '#e6f4ff',
                      borderRadius: '50%',
                      padding: 12
                    }}
                  />
                  <Title level={5} style={{ marginTop: 8 }}>
                    Người dùng
                  </Title>
                  <Text type='secondary'>
                    Các tin nhắn bạn đã nhắn đến các địa điểm.
                  </Text>
                </Space>
              </Card>
            </Col>

            <Col xs={24} sm={12}>
              <Card
                hoverable
                onClick={() => setSelectedOption('provider')}
                style={{
                  borderRadius: 12,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                styles={{ body: { padding: 24 } }}
              >
                <Space direction='vertical' align='center'>
                  <ShopOutlined
                    style={{
                      fontSize: 36,
                      color: '#eb2f96',
                      backgroundColor: '#fff0f6',
                      borderRadius: '50%',
                      padding: 12
                    }}
                  />
                  <Title level={5} style={{ marginTop: 8 }}>
                    Quản lý
                  </Title>
                  <Text type='secondary'>
                    Các thắc mắc của người dùng gửi đến bạn
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>{' '}
        </>
      ) : selectedOption === 'user' ? (
        <Message isProvider onBack={() => setSelectedOption(null)} />
      ) : (
        <MessageByPlace onBack={() => setSelectedOption(null)} />
      )}
    </>
  );
}

export default MessageOptionChoice;
