import { useState } from 'react';
import {
  FloatButton,
  Drawer,
  Input,
  Button,
  Typography,
  Spin,
  message
} from 'antd';
import {
  WechatWorkOutlined,
  SendOutlined,
  CloseOutlined,
  MessageOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserMessage,
  clearIsTripPlan,
  sendMessageToAI
} from '../../redux/slices/chatSlice';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Chatbot() {
  const { bubbleChat, arrowBottom, wave } = styles;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chat, loading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [messageUser, setMessageUser] = useState('');

  const handleSend = () => {
    if (!user) {
      message.error('Hãy đăng nhập để được tư vấn.');
      navigate('/login');
      return;
    }
    if (!messageUser.trim()) return;
    dispatch(addUserMessage(messageUser));
    dispatch(sendMessageToAI({ question: messageUser }));
    setMessageUser('');
  };
  const handleEditItinerary = () => {
    dispatch(clearIsTripPlan());
    navigate('/itinerary/edit-chatbot');
  };
  return (
    <>
      {showIntro && (
        <div className={bubbleChat}>
          <span style={{ flex: 1 }}>
            <span className={wave}>👋</span> Xin chào! Tôi là Trợ lý Du lịch AI
          </span>
          <CloseOutlined
            onClick={() => setShowIntro(false)}
            style={{
              cursor: 'pointer',
              fontSize: 12,
              color: '#888',
              marginLeft: 4
            }}
          />
          <div className={arrowBottom} />
        </div>
      )}

      {/* 🟦 Nút chat nổi */}
      <FloatButton
        icon={<WechatWorkOutlined style={{ fontSize: 24 }} />}
        type='primary'
        tooltip='Trò chuyện với Trợ lý Du lịch AI'
        style={{ right: 30, width: 64, height: 64 }}
        onClick={() => setOpen(true)}
      />

      {/* 🧭 Drawer chatbot */}
      <Drawer
        title={
          <Text strong style={{ color: '#1677ff' }}>
            VIGO TRAVEL AI <MessageOutlined />
          </Text>
        }
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
        width={450}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: 0,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%)'
          }
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 30
                }}
              >
                {msg.sender !== 'user' && (
                  <>
                    <span
                      style={{
                        backgroundColor: '#787676ff',
                        borderRadius: '50%',
                        width: 25,
                        marginTop: -15,
                        paddingTop: 5,
                        textAlign: 'center',
                        height: 25
                      }}
                    >
                      VT
                    </span>
                  </>
                )}
                <div
                  style={{
                    background:
                      msg.sender === 'user'
                        ? 'linear-gradient(135deg, #1677ff, #4096ff)'
                        : 'white',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    padding: '10px 14px',
                    borderRadius: 16,
                    maxWidth: '75%',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    animation: 'slideIn 0.3s ease'
                  }}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
                {msg.sender === 'user' && (
                  <img
                    src={`http://localhost:3000${user?.avatarUrl}`}
                    alt='User'
                    style={{
                      marginTop: -15,
                      width: 25,
                      height: 25,
                      borderRadius: '50%'
                    }}
                  />
                )}
              </div>
              {msg.sender !== 'user' && msg.isTripPlan && (
                <div
                  style={{
                    marginLeft: 30,
                    marginTop: -20
                  }}
                >
                  {' '}
                  <Button
                    color='cyan'
                    variant='filled'
                    onClick={() => handleEditItinerary()}
                  >
                    Chỉnh sửa lịch trình
                  </Button>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ textAlign: 'left', margin: '10px 0' }}>
              <span> Đang suy nghĩ</span>
              <Spin size='small' />
            </div>
          )}
        </div>

        {/* Ô nhập tin nhắn */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',
            borderTop: '1px solid #ddd',
            background: 'white'
          }}
        >
          <Input
            placeholder='Nhập câu hỏi...'
            value={messageUser}
            onChange={(e) => setMessageUser(e.target.value)}
            onPressEnter={handleSend}
            style={{ marginRight: 8, borderRadius: 20 }}
          />
          <Button
            type='primary'
            shape='circle'
            icon={<SendOutlined />}
            onClick={handleSend}
          />
        </div>
      </Drawer>
    </>
  );
}
