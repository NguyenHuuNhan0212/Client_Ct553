import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllMessageUser,
  setTotalMessageUnreadUser
} from '../../../redux/slices/messageSlice';

function ListMessage({ setSelectedPlace }) {
  const dispatch = useDispatch();
  const { messagesUser } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(getAllMessageUser());
  }, [dispatch]);
  useEffect(() => {
    if (messagesUser) {
      dispatch(setTotalMessageUnreadUser());
    }
  }, [messagesUser, dispatch]);
  return (
    <List
      itemLayout='horizontal'
      dataSource={messagesUser}
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
