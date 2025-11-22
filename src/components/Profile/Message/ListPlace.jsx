import { EnvironmentOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllMessageManage,
  setTotalMessageUnreadManage
} from '../../../redux/slices/messageSlice';

function PlaceList({ setSelectedPlace }) {
  const dispatch = useDispatch();
  const { messagesManage } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(getAllMessageManage());
  }, [dispatch]);
  useEffect(() => {
    if (messagesManage) {
      dispatch(setTotalMessageUnreadManage());
    }
  }, [messagesManage, dispatch]);
  return (
    <List
      itemLayout='horizontal'
      dataSource={messagesManage}
      renderItem={(place) => (
        <List.Item
          onClick={() => setSelectedPlace(place)}
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
              <Badge count={place.unread || 0} showZero size='small'>
                <Avatar
                  icon={<EnvironmentOutlined />}
                  src={`http://localhost:3000/${place.images?.[0]}`}
                  style={{ backgroundColor: '#1677ff' }}
                />
              </Badge>
            }
            title={
              <Tooltip
                title={`Nhấn để xem danh sách người nhắn tin đến ${capitalizeName(
                  place.name
                )}`}
              >
                {capitalizeName(place.name)}
              </Tooltip>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default PlaceList;
