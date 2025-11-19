import React, { useState } from 'react';
import { List, Avatar, Badge, Button, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import ChatBox from './Message/ChatBox';
import { useSelector } from 'react-redux';
import ListMessage from './Message/ListMessage';

export default function Message({ onBack, isProvider = false }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const { user } = useSelector((state) => state.user);

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
        <>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Danh sách địa điểm bạn đã trò chuyện
          </Typography.Title>
          <ListMessage setSelectedPlace={(value) => setSelectedPlace(value)} />
        </>
      ) : (
        <ChatBox
          userId={user?._id}
          placeId={selectedPlace?._id}
          friendId={selectedPlace?.userId}
          urlImage={selectedPlace?.images[0]}
          isPlace
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
