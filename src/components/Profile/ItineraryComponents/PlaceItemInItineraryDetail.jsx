import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  PlusCircleFilled
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography
} from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import itineraryApi from '../../../apis/itineraryService';
import { useDispatch } from 'react-redux';
import { getItineraryDetail } from '../../../redux/slices/itinerarySlice';
const { Title, Text } = Typography;
function PlaceItineraryDetail({ place, isTemplate }) {
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onAddNote = () => {
    setNote(place?.note);
    setIsOpenNote(true);
  };
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleUpdateNote = async () => {
    setIsLoading(true);
    try {
      const data = {
        itineraryDetailId: place?.itineraryDetailId,
        note: note
      };
      await itineraryApi.updateNoteForItineraryDetail(data);
      await dispatch(getItineraryDetail(place?.itineraryId)).unwrap();
    } catch (err) {
      console.log(err?.message || 'Lỗi khi cập nhật note.');
    } finally {
      setIsLoading(false);
      setIsOpenNote(false);
    }
  };
  return (
    <Card
      hoverable
      style={{
        display: 'flex',
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden'
      }}
      styles={{ body: { padding: '12px 16px' } }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={`http://localhost:3000/${place.images[0]}`}
            alt={place.name}
            style={{
              width: 140,
              height: 100,
              objectFit: 'cover',
              borderRadius: 8
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {place.placeId?.deleted ? (
            <Tooltip title={'Địa điểm không còn.'}>
              <Title level={5} style={{ marginTop: -3 }}>
                {place.name}
              </Title>
            </Tooltip>
          ) : (
            <Link
              to={
                place.placeId?.type === 'hotel'
                  ? `/hotel/${place?.placeId?._id}`
                  : `/place/${place?.placeId?._id}`
              }
            >
              <Tooltip title={'Nhấn để xem chi tiết địa điểm'}>
                <Title level={5} style={{ marginTop: -3 }}>
                  {place.name}
                </Title>
              </Tooltip>
            </Link>
          )}

          <Space size='small' align='center' style={{ marginBottom: 6 }}>
            <EnvironmentOutlined style={{ color: '#52c41a' }} />
            <Text type='secondary'>{place.address}</Text>
          </Space>
          <Space size='small' align='center' style={{ marginBottom: 6 }}>
            <ClockCircleOutlined style={{ color: '#f6971bff' }} />
            <Text type='secondary'>{place.duration}</Text>
          </Space>

          {!isOpenNote && (
            <Space size='small' align='center' style={{ marginBottom: 6 }}>
              <InfoCircleOutlined style={{ color: '#1677ff' }} />
              <Text type='secondary'>
                {place.note || 'Chưa có ghi chú cho địa điểm này.'}
              </Text>
              {!isTemplate && (
                <Tooltip title='Thêm ghi chú cho địa điểm'>
                  <PlusCircleFilled
                    style={{ color: '#1677ff', fontSize: 18 }}
                    onClick={onAddNote}
                  />
                </Tooltip>
              )}
            </Space>
          )}

          {isOpenNote && (
            <div style={{ marginTop: 8 }}>
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 20 }}
                placeholder='Thêm ghi chú cho địa điểm...'
                defaultValue={place.note}
                style={{ marginTop: 8, marginBottom: 8, borderRadius: 8 }}
                onChange={(e) => handleChangeNote(e)}
              />
              <Button type='primary' size='small' onClick={handleUpdateNote}>
                {isLoading ? <Spin size='small' /> : 'Lưu'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default PlaceItineraryDetail;
