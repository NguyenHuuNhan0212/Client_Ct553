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
