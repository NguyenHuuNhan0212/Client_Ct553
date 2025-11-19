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
import { capitalizeName } from '../../../utils/capitalize';

export default function MessageByPlace({ onBack }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  return (
    <>
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

      {!selectedPlace && (
        <>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Danh sách địa điểm có người nhắn tin đến
          </Typography.Title>
          <PlaceList setSelectedPlace={(value) => setSelectedPlace(value)} />
        </>
      )}

      {/* Danh sách user đã nhắn đến địa điểm */}
      {selectedPlace && !selectedUser && (
        <>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Danh sách người dùng đã nhắn tin đến{' '}
            {capitalizeName(selectedPlace?.name)}
          </Typography.Title>
          <ChatUsersToPlace
            selectedPlace={selectedPlace}
            setSelectedUser={(value) => setSelectedUser(value)}
          />
        </>
      )}

      {/* ChatBox */}
      {selectedPlace && selectedUser && (
        <ChatBox
          userId={user?._id}
          placeId={selectedPlace?._id}
          friendId={selectedUser?._id}
          urlImage={selectedUser?.avatarUrl}
          name={selectedUser?.fullName}
          onBack={() => setSelectedUser(null)}
          isBack
        />
      )}
    </>
  );
}
