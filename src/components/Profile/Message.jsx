import React, { useEffect, useState } from 'react';
import { List, Avatar, Badge, Button, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import userApi from '../../apis/userService';
import ChatBox from './Message/ChatBox';
import { useSelector } from 'react-redux';

export default function Message({ onBack, isProvider = false }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state) => state.user);
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
  console.log(selectedPlace);
  return (
    <>
      {isProvider && !selectedPlace && (
        <Tooltip title={'Trở lại tin nhắn'}>
          <Button onClick={onBack} style={{ marginBottom: 16, width: 150 }}>
            <Typography.Text strong>
              <ArrowLeftOutlined /> Quay lại
            </Typography.Text>
          </Button>
        </Tooltip>
      )}
      {!selectedPlace ? (
        <List
          itemLayout='horizontal'
          dataSource={conversations}
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => setSelectedPlace(item)}
                style={{
                  cursor: 'pointer',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '6px',
                  transition: '0.2s'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={item.unread || 0} showZero size='small'>
                      <Avatar
                        icon={<UserOutlined />}
                        src={`http://localhost:3000/${item.images[0]}`}
                        style={{ backgroundColor: '#1677ff' }}
                      />
                    </Badge>
                  }
                  title={
                    <span style={{ fontWeight: 'normal' }}>{item.name}</span>
                  }
                  description={
                    <span style={{ color: '#888', fontSize: '13px' }}>
                      {item.lastMessage || 'Chưa có tin nhắn'}
                    </span>
                  }
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <ChatBox
          userId={user?._id}
          placeId={selectedPlace?._id}
          friendId={selectedPlace?.userId}
          name={selectedPlace?.name}
          onBack={() => {
            setSelectedPlace(null);
          }}
          isBack
        />
      )}
    </>
  );
}
