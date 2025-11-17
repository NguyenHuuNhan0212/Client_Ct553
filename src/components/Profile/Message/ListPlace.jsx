import { EnvironmentOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import placeApi from '../../../apis/placeService';
import { capitalizeName } from '../../../utils/capitalize';

function PlaceList({ setSelectedPlace }) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await placeApi.getAllPlaceHaveMessage();
        setPlaces(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy danh sách địa điểm chat.');
      }
    };
    fetchPlaces();
  }, []);

  return (
    <List
      itemLayout='horizontal'
      dataSource={places}
      renderItem={(place) => (
        <List.Item
          onClick={() => setSelectedPlace(place)}
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
