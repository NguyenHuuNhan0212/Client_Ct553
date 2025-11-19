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
  Tooltip,
  Divider
} from 'antd';
import {
  SendOutlined,
  UserOutlined,
  GlobalOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './style.module.css';
import messageApi from '../../../apis/message';

const { Sider, Content } = Layout;

export default function ChatBox({
  userId,
  friendId,
  placeId,
  name,
  onBack,
  urlImage,
  isPlace = false,
  isBack = false
}) {
  const { myMessage, otherMessage, textStyle, time } = styles;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isHover, setIsHover] = useState(null);
  const bottomRef = useRef(null);

  const isNewDay = (currentMsg, prevMsg) => {
    if (!prevMsg) return true;
    const currentDay = dayjs(currentMsg.createdAt).format('YYYY-MM-DD');
    const prevDay = dayjs(prevMsg.createdAt).format('YYYY-MM-DD');
    return currentDay !== prevDay;
  };

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
    s.on('messagesRead', () => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.sender === userId) {
            return { ...msg, isRead: true };
          }
          return msg;
        })
      );
    });

    return () => s.disconnect();
  }, [userId, friendId, placeId]);

  // Lấy tin nhắn cũ
  useEffect(() => {
    const fetch = async () => {
      const res = await messageApi.getMessages({ placeId, friendId });
      setMessages(res);
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
    // setMessages((prev) => [...prev, msg]);
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
      <Layout
        style={{
          height: '80vh',
          background: '#e6f0ff',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              height: '5%',
              background: '#0052cc',
              fontSize: 18,
              fontWeight: 700,
              padding: '8px 16px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            {messages?.map((msg, i) => {
              const showDate = isNewDay(msg, messages[i - 1]);
              const isLast = i === messages.length - 1;
              return (
                <div key={i}>
                  {showDate && (
                    <Divider>
                      {dayjs(msg.createdAt).format('DD/MM/YYYY')}
                    </Divider>
                  )}

                  <div
                    className={msg.sender === userId ? myMessage : otherMessage}
                  >
                    <div
                      className={textStyle}
                      onMouseEnter={() => setIsHover(msg._id)}
                      onMouseLeave={() => setIsHover(null)}
                    >
                      {msg.text}
                    </div>
                    <div className={time}>
                      <span>
                        {dayjs(msg.createdAt || new Date()).format('HH:mm')}{' '}
                      </span>
                      {msg.sender === userId &&
                        (isLast || isHover === msg._id ? ( // hover hoặc tin nhắn cuối
                          msg.isRead ? (
                            <img
                              src={
                                !isPlace
                                  ? `http://localhost:3000${urlImage}`
                                  : `http://localhost:3000/${urlImage}`
                              }
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: '50%'
                              }}
                            />
                          ) : (
                            'Đã gửi'
                          )
                        ) : (
                          ''
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}

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
