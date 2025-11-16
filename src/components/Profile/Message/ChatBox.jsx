import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  Input,
  Button,
  List,
  Avatar,
  Typography,
  Spin,
  Layout,
  Tooltip
} from 'antd';
import {
  SendOutlined,
  UserOutlined,
  GlobalOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from './style.module.css';

const { Sider, Content } = Layout;

export default function ChatBox({
  userId,
  friendId,
  placeId,
  name,
  onBack,
  isBack = false
}) {
  const { myMessage, otherMessage, textStyle, time } = styles;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  // Kết nối socket.io
  useEffect(() => {
    const s = io('http://localhost:3000'); // URL backend của bạn
    setSocket(s);

    // Join room theo userId
    s.emit('join', { userId, placeId, friendId });

    // Lắng nghe tin nhắn realtime
    s.on('receiveMessage', (msg) => {
      if (
        (msg.sender === friendId && msg.receiver === userId) ||
        (msg.sender === userId && msg.receiver === friendId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => s.disconnect();
  }, [userId, friendId, placeId]);

  // Lấy tin nhắn cũ
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/messages/${placeId}/${userId}/${friendId}`
      );
      setMessages(res.data);
    };
    fetch();
  }, [userId, friendId, placeId]);

  // Scroll cuối danh sách
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      sender: userId,
      receiver: friendId,
      placeId,
      text
    };

    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <>
      {isBack && (
        <Tooltip title={'Trở lại tin nhắn'}>
          <Button onClick={onBack} style={{ marginBottom: 16, width: 150 }}>
            <Typography.Text strong>
              <ArrowLeftOutlined /> Quay lại
            </Typography.Text>
          </Button>
        </Tooltip>
      )}
      <Layout style={{ height: '80vh', background: '#f0f8ff' }}>
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              height: '8%',
              background: '#8ba0b4ff',
              fontSize: 18,
              fontWeight: 700,
              padding: 5,
              color: '#464b4fff'
            }}
          >
            {name}
          </div>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 12px',
              backdropFilter: 'blur(3px)'
            }}
          >
            {messages?.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === userId ? myMessage : otherMessage}
              >
                <div className={textStyle}>{msg.text}</div>
                <div className={time}>
                  {dayjs(msg.createdAt || new Date()).format('HH:mm')}
                </div>
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          {/* Input gửi tin */}
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <Input
              placeholder='Nhập tin nhắn...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPressEnter={sendMessage}
              style={{
                borderRadius: 20,
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.7)'
              }}
            />
            <Button
              type='primary'
              icon={<SendOutlined />}
              shape='circle'
              onClick={sendMessage}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
}
