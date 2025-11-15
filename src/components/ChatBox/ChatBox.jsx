import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Input, Button, List, Avatar, Typography, Spin, Layout } from 'antd';
import { SendOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from './style.module.css';

const { Sider, Content } = Layout;

export default function ChatBox({ userId, friendId, friends }) {
  const { myMessage, ortherMessage, textStyle, time } = styles;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  // Kết nối socket.io
  useEffect(() => {
    const s = io('http://localhost:3000'); // URL backend của bạn
    setSocket(s);

    // Join room theo userId
    s.emit('join', userId);

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
  }, [userId, friendId]);

  // Lấy tin nhắn cũ
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/messages/${userId}/${friendId}`
      );
      setMessages(res.data);
    };
    fetch();
  }, [userId, friendId]);

  // Scroll cuối danh sách
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      sender: userId,
      receiver: friendId,
      text
    };

    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <Layout style={{ height: '80vh', background: '#f0f8ff' }}>
      {/* Sidebar */}
      <Sider width={260} style={{ padding: 20, background: '#ffffff' }}>
        <Typography.Title level={4}>
          <GlobalOutlined /> Chat du lịch
        </Typography.Title>

        <List
          itemLayout='horizontal'
          dataSource={[friends]}
          renderItem={(item) => (
            <List.Item
              style={{
                background: '#e6f7ff',
                borderRadius: 8,
                padding: 10,
                marginTop: 8
              }}
            >
              <List.Item.Meta
                avatar={<Avatar size={45} icon={<UserOutlined />} />}
                title={<b>{item.name}</b>}
                description='Đang hoạt động'
              />
            </List.Item>
          )}
        />
      </Sider>

      {/* Chat content */}
      <Content
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          background: "url('https://i.imgur.com/XxXz3cB.jpg') center/cover"
        }}
      >
        {/* Danh sách tin nhắn */}
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
              className={msg.sender === userId ? myMessage : ortherMessage}
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
  );
}
