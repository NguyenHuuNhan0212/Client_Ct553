import { Empty, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';
import ServiceList from '../Service/ServiceList';

const { Title } = Typography;
function PlaceFavorite() {
  const dispatch = useDispatch();
  const { placesFavorite } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch(getPlacesFavorite());
  }, [dispatch]);

  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        Danh sách địa điểm yêu thích
      </Title>
      {!placesFavorite.length && (
        <Empty description={'Chưa có địa điểm yêu thích nào'} />
      )}
      <ServiceList places={placesFavorite} />;
    </>
  );
}

export default PlaceFavorite;
