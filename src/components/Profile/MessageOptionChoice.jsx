import {
  EditOutlined,
  RobotOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Badge, Card, Col, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Message from './Message';
import MessageByPlace from './Message/MessageByPlace';
import userApi from '../../apis/userService';
import placeApi from '../../apis/placeService';

const { Title, Text } = Typography;
function MessageOptionChoice() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [messagesReceive, setMessagesReceive] = useState([]);
  const [conversations, setConversations] = useState([]);

  const totalMessagesToMeFromSupplier = conversations?.reduce((acc, crr) => {
    return acc + crr?.unread;
  }, 0);

  const totalMessageFromUser = messagesReceive?.reduce((acc, crr) => {
    return acc + crr?.unread;
  }, 0);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await userApi.getAllPlacesChat();
        setConversations(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy danh sách địa điểm chat.');
      }
    };
    fetchConversations();
  }, []);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await placeApi.getAllPlaceHaveMessage();
        setMessagesReceive(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy danh sách địa điểm chat.');
      }
    };
    fetchPlaces();
  }, []);
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
                  <Badge count={totalMessagesToMeFromSupplier || 0} showZero>
                    <UserOutlined
                      style={{
                        fontSize: 36,
                        color: '#1677ff',
                        backgroundColor: '#e6f4ff',
                        borderRadius: '50%',
                        padding: 12
                      }}
                    />
                  </Badge>

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
                  <Badge count={totalMessageFromUser || 0} showZero>
                    <ShopOutlined
                      style={{
                        fontSize: 36,
                        color: '#eb2f96',
                        backgroundColor: '#fff0f6',
                        borderRadius: '50%',
                        padding: 12
                      }}
                    />
                  </Badge>

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
