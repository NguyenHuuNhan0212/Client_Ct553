import { useEffect, useState } from 'react';
import userApi from '../../../apis/userService';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { capitalizeName } from '../../../utils/capitalize';

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
                  src={`http://localhost:3000${userItem?.avatarUrl}`}
                  style={{ backgroundColor: '#040505ff' }}
                />
              </Badge>
            }
            title={
              <Tooltip
                title={`Nhấn để trò chuyện với ${capitalizeName(
                  userItem.fullName
                )}`}
              >
                {capitalizeName(userItem.fullName)}
              </Tooltip>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default ChatUsersToPlace;
