import { useState } from 'react';
import { FloatButton, Drawer, Input, Button, Typography, Spin } from 'antd';
import {
  WechatWorkOutlined,
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendMessageToAI } from '../../redux/slices/chatSlice';

const { Text } = Typography;

export default function Chatbot() {
  const { bubbleChat, arrowBottom, wave } = styles;
  const dispatch = useDispatch();
  const { chat, loading } = useSelector((state) => state.chat);
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(addUserMessage(message));
    dispatch(sendMessageToAI({ question: message }));
    setMessage('');
  };

  return (
    <>
      {/* 💬 Bong bóng chào cố định trên nút chat */}
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
            Trợ lý Du lịch AI 💬
          </Text>
        }
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
        width={400}
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
                justifyContent:
                  msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10
              }}
            >
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
              >
                {msg.text}
              </div>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
