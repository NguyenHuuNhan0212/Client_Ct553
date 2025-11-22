import { useEffect, useState } from 'react';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { capitalizeName } from '../../../utils/capitalize';
import messageApi from '../../../apis/messageService';

function ChatUsersToPlace({ selectedPlace, setSelectedUser }) {
  const [usersByPlace, setUsersByPlace] = useState([]);
  useEffect(() => {
    if (selectedPlace) {
      const fetchUsers = async () => {
        try {
          const res = await messageApi.getAllChatUserToProvider(
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
            backgroundColor: '#faf9f9ff',
            marginBottom: '6px',
            transition: '0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1efefff';
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#faf9f9ff';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
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
