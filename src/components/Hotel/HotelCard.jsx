import { Card, Tag, Button, message, Tooltip } from 'antd';
import {
  DollarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import placeApi from '../../apis/placeService';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';
import { capitalizeName } from '../../utils/capitalize';
export default function HotelCard({ hotel }) {
  const { checkIn, checkOut } = useSelector((state) => state.hotel);
  const { user } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const { placesFavorite } = useSelector((state) => state.place);
  const firstImage =
    hotel?.images && hotel?.images.length > 0
      ? `http://localhost:3000/${hotel.images[0]}`
      : 'https://via.placeholder.com/400x250?text=No+Image';
  const dispatch = useDispatch();
  const toggleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (!isFavorite) {
        await placeApi.addPlaceFavorite({ placeId: hotel.hotelId });
        message.success('Đã thêm vào danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(true);
      } else {
        await placeApi.removePlaceFavorite({ placeId: hotel.hotelId });
        message.info('Đã xóa khỏi danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(false);
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(getPlacesFavorite());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (placesFavorite && placesFavorite.length > 0) {
      const favoriteIds = placesFavorite.map((f) => f._id.toString());
      setIsFavorite(favoriteIds.includes(hotel.hotelId.toString()));
    } else {
      setIsFavorite(false);
    }
  }, [placesFavorite, hotel.hotelId]);

  return (
    <Card
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={hotel?.name}
            src={firstImage}
            style={{
              height: 220,
              objectFit: 'cover',
              width: '100%'
            }}
          />
          <Tooltip
            title={
              !isFavorite
                ? 'Thêm vào danh sách yêu thích'
                : 'Xóa khỏi danh sách yêu thích'
            }
          >
            <div
              onClick={toggleFavorite}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontSize: 22,
                color: isFavorite ? 'red' : 'white',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: '50%',
                padding: 6,
                cursor: 'pointer'
              }}
            >
              {isFavorite ? <HeartFilled /> : <HeartOutlined />}
            </div>
          </Tooltip>
        </div>
      }
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {capitalizeName(hotel?.name)}
          </div>
          <div
            style={{
              color: '#555',
              fontSize: 14,
              marginBottom: 10,
              maxHeight: 50,
              overflow: 'hidden'
            }}
          >
            <EnvironmentOutlined /> {hotel?.address}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Tag color='green' style={{ fontSize: 14 }}>
              <DollarOutlined /> {hotel?.minPricePerNight?.toLocaleString()}{' '}
              VNĐ/đêm
            </Tag>
            {checkIn && checkOut && (
              <span style={{ fontWeight: 600 }}>
                Tổng: {hotel?.minTotal?.toLocaleString()}VNĐ ({hotel?.nights}{' '}
                ngày)
              </span>
            )}
          </div>

          <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
            <Tag color='blue'>
              {hotel?.availableRoomTypesCount} loại phòng còn trống
            </Tag>
          </div>
        </div>

        {hotel.deleted ? (
          <Tag color='error'>Địa điểm không còn</Tag>
        ) : (
          <Link to={`/hotel/${hotel?.hotelId}`}>
            <Button type='primary' block style={{ marginTop: 12 }}>
              Xem chi tiết
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
