import { useEffect } from 'react';
import { Badge, Card, Col, Row, Space, Typography } from 'antd';
import { ShopOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMessageManage,
  getAllMessageUser,
  setTotalMessageUnreadManage,
  setTotalMessageUnreadUser
} from '../../../redux/slices/messageSlice';
const { Title, Text } = Typography;
function OptionChoice({ setSelectedOption }) {
  const dispatch = useDispatch();
  const {
    messagesUser,
    messagesManage,
    totalMessageOfUserUnRead,
    totalMessageOfManagementUnRead
  } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getAllMessageManage());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllMessageUser());
  }, [dispatch]);
  useEffect(() => {
    if (messagesManage) {
      dispatch(setTotalMessageUnreadManage());
    }
  }, [messagesManage, dispatch]);
  useEffect(() => {
    if (messagesUser) {
      dispatch(setTotalMessageUnreadUser());
    }
  }, [messagesUser, dispatch]);

  return (
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
              <Badge count={totalMessageOfUserUnRead} showZero>
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
              <Badge count={totalMessageOfManagementUnRead} showZero>
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
      </Row>
    </>
  );
}

export default OptionChoice;
