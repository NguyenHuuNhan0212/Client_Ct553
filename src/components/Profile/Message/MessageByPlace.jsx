import React, { useState } from 'react';
import { List, Avatar, Badge, Button, Tooltip, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ChatBox from './ChatBox';
import PlaceList from './ListPlace';
import ChatUsersToPlace from './ChatUsersToPlace';

export default function MessageByPlace({ onBack }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.user);

  // Lấy danh sách địa điểm mà user đã chat

  return (
    <>
      {/* Back button khi là provider hoặc đang xem danh sách user */}
      {!selectedUser && selectedPlace && (
        <Tooltip title={'Trở lại'}>
          <Button
            onClick={() => {
              if (selectedUser) setSelectedUser(null);
              else setSelectedPlace(null);
            }}
            style={{ marginBottom: 16, width: 150 }}
          >
            <Typography.Text strong>
              <ArrowLeftOutlined /> Quay lại
            </Typography.Text>
          </Button>
        </Tooltip>
      )}
      {!selectedUser && !selectedPlace && (
        <Tooltip title={'Trở lại'}>
          <Button onClick={onBack} style={{ marginBottom: 16, width: 150 }}>
            <Typography.Text strong>
              <ArrowLeftOutlined /> Quay lại
            </Typography.Text>
          </Button>
        </Tooltip>
      )}

      {/* Danh sách địa điểm */}
      {!selectedPlace && (
        <PlaceList setSelectedPlace={(value) => setSelectedPlace(value)} />
      )}

      {/* Danh sách user đã nhắn đến địa điểm */}
      {selectedPlace && !selectedUser && (
        <ChatUsersToPlace
          selectedPlace={selectedPlace}
          setSelectedUser={(value) => setSelectedUser(value)}
        />
      )}

      {/* ChatBox */}
      {selectedPlace && selectedUser && (
        <ChatBox
          userId={user?._id}
          placeId={selectedPlace?._id}
          friendId={selectedUser?._id}
          name={selectedUser?.fullName}
          onBack={() => setSelectedUser(null)}
          isBack
        />
      )}
    </>
  );
}
