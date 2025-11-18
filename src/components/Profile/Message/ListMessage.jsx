import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import userApi from '../../../apis/userService';
import { capitalizeName } from '../../../utils/capitalize';

function ListMessage({ setSelectedPlace }) {
  const [conversations, setConversations] = useState([]);
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
  return (
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
                <Badge count={item.unread || 0} showZero size='small'>
                  <Avatar
                    icon={<UserOutlined />}
                    src={`http://localhost:3000/${item.images[0]}`}
                    style={{ backgroundColor: '#1677ff' }}
                  />
                </Badge>
              }
              title={
                <Tooltip
                  title={`Nhấn để trò chuyện với ${capitalizeName(item.name)}`}
                >
                  {capitalizeName(item.name)}
                </Tooltip>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}

export default ListMessage;
