import { Empty, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';
import ServiceList from '../Service/ServiceList';

const { Title, Text } = Typography;
function PlaceFavorite() {
  const [filterType, setFilterType] = useState('new');
  const dispatch = useDispatch();
  const { placesFavorite } = useSelector((state) => state.place);
  const places = placesFavorite?.map((p) => p.placeId);
  let filteredPlacesFavorite = filterType === 'new' ? places : places.reverse();
  const onChangeSelect = (value) => {
    setFilterType(value);
  };
  useEffect(() => {
    dispatch(getPlacesFavorite());
  }, [dispatch]);

  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        Danh sách địa điểm yêu thích
      </Title>
      <div style={{ marginBottom: 10, textAlign: 'right' }}>
        <Space>
          <Select
            style={{ width: '100%' }}
            defaultValue={'Mới nhất'}
            onChange={onChangeSelect}
            options={[
              {
                value: 'new',
                label: 'Mới nhất'
              },
              {
                value: 'old',
                label: 'Cũ nhất'
              }
            ]}
          />
        </Space>
      </div>

      <ServiceList places={filteredPlacesFavorite} />
    </>
  );
}

export default PlaceFavorite;
