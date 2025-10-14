import { useEffect, useState } from 'react';
import { Button, Card, message, Tag, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { capitalizeName } from '../../utils/capitalize';
import {
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';
import placeApi from '../../apis/placeService';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';

const { Meta } = Card;

export default function ServiceCard({
  _id,
  name,
  images,
  address,
  deleted,
  type,
  isHotel = false
}) {
  const { user } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const { placesFavorite } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleFavorite = async (e) => {
    if (!user) {
      message.warning('Đăng nhập để thêm địa điểm vào danh sách yêu thích');
      navigate('/login');
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    try {
      if (!isFavorite) {
        await placeApi.addPlaceFavorite({ placeId: _id });
        message.success('Đã thêm vào danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(true);
      } else {
        await placeApi.removePlaceFavorite({ placeId: _id });
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
      setIsFavorite(favoriteIds.includes(_id.toString()));
    } else {
      setIsFavorite(false);
    }
  }, [placesFavorite, _id]);
  return (
    <Card
      hoverable
      cover={
        <div style={{ position: 'relative' }}>
          <img
            alt={name}
            src={
              images && images.length > 0
                ? `http://localhost:3000/${images[0]}`
                : ''
            }
            style={{ height: 180, objectFit: 'cover', width: '100%' }}
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Meta
        style={{ fontSize: '16px' }}
        title={capitalizeName(name)}
        description={
          <>
            <div>
              <EnvironmentOutlined /> {address}
            </div>
            <div>
              Loại:{' '}
              {type === 'touristSpot'
                ? 'Địa điểm du lịch'
                : type === 'cafe'
                ? 'Quán cafe'
                : type === 'restaurant'
                ? 'Địa điểm ăn uống'
                : 'Khách sạn, nhà nghỉ'}
            </div>
          </>
        }
      />
      {deleted ? (
        <Tag color='error'> Địa điểm không còn</Tag>
      ) : (
        <Link to={isHotel ? `/hotel/${_id}` : `/place/${_id}`}>
          <Button type='primary' block style={{ marginTop: 12 }}>
            Xem chi tiết
          </Button>
        </Link>
      )}
    </Card>
  );
}
