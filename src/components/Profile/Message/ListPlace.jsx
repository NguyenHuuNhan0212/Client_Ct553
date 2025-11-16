import { EnvironmentOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { useEffect, useState } from 'react';
import placeApi from '../../../apis/placeService';

function PlaceList({ setSelectedPlace }) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await placeApi.getAllPlaceOfUser();
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
              <Avatar
                icon={<EnvironmentOutlined />}
                src={`http://localhost:3000/${place.images?.[0]}`}
                style={{ backgroundColor: '#1677ff' }}
              />
            }
            title={place.name}
          />
        </List.Item>
      )}
    />
  );
}

export default PlaceList;
