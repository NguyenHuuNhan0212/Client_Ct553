import { useEffect, useState } from 'react';
import userApi from '../../../apis/userService';
import { Avatar, Badge, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function ChatUsersToPlace({ selectedPlace, setSelectedUser }) {
  const [usersByPlace, setUsersByPlace] = useState([]);
  useEffect(() => {
    if (selectedPlace) {
      const fetchUsers = async () => {
        try {
          const res = await userApi.getAllChatUserToProvider(
            selectedPlace?._id
          );

          setUsersByPlace(res);
        } catch (err) {
          console.log(
            err.message || 'Lỗi khi lấy danh sách người nhắn đến địa điểm.'
          );
        }
      };
      fetchUsers();
    }
  }, [selectedPlace]);

  return (
    <List
      itemLayout='horizontal'
      dataSource={usersByPlace}
      renderItem={(userItem) => (
        <List.Item
          onClick={() => setSelectedUser(userItem)}
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
              <Badge count={userItem.unread || 0} showZero size='small'>
                <Avatar
                  icon={<UserOutlined />}
                  src={`http://localhost:3000/${userItem.images?.[0]}`}
                  style={{ backgroundColor: '#1677ff' }}
                />
              </Badge>
            }
            title={userItem.fullName}
          />
        </List.Item>
      )}
    />
  );
}

export default ChatUsersToPlace;
