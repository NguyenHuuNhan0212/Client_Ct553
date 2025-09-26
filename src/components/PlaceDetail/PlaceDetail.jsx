import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Typography, List, Row, Col, Divider, Layout, Tag } from 'antd';
import { capitalizeName } from '../../utils/capitalize';
import PlaceRelative from './PlaceRelative';
const { Content } = Layout;
const { Title, Paragraph } = Typography;

function PlaceDetail({ currentPlace }) {
  const [mainImage, setMainImage] = useState(null);

  const { place, services, roomTypes, ownerInfo } = currentPlace;
  useEffect(() => {
    if (place?.images?.length > 0) {
      setMainImage(`http://localhost:3000/${place.images[0]}`);
    }
  }, [place]);
  return (
    <Content
      style={{
        padding: '0 200px',
        marginTop: '65px'
      }}
    >
      {/* Ảnh chính + thumbnail */}
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxHeight: '500px',
            overflowY: 'auto',
            marginRight: 10
          }}
        >
          {place?.images?.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:3000/${img}`}
              alt={`thumb-${idx}`}
              onClick={() => setMainImage(`http://localhost:3000/${img}`)}
              style={{
                width: 80,
                height: 60,
                objectFit: 'cover',
                borderRadius: 5,
                cursor: 'pointer',
                border:
                  mainImage === `http://localhost:3000/${img}`
                    ? '2px solid #1890ff'
                    : '1px solid #ddd'
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            background: '#fafafa'
          }}
        >
          <img
            src={mainImage}
            alt='main'
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>
      <Row gutter={5}>
        {/* Thông tin chung */}
        <Col span={16}>
          <Title level={2}>{capitalizeName(place?.name)}</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Địa chỉ:</b> {place?.address}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Loại địa điểm: </b>{' '}
            {place?.type === 'hotel'
              ? 'Khách sạn, nhà nghĩ'
              : place?.type === 'touristSpot'
              ? 'Địa điểm du lịch'
              : place?.type === 'cafe'
              ? 'Quán cafe'
              : 'Địa điểm ăn uống'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Trạng thái hoạt động: </b>{' '}
            <Tag
              style={{ fontSize: '16px' }}
              color={place?.isActive ? 'green' : 'red'}
            >
              {place?.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </Tag>
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Giới thiệu địa điểm: </b>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(place?.description || '')
              }}
            />
          </Paragraph>
        </Col>
        <Col span={8}>
          <Divider style={{ fontSize: '20px' }}>Thông tin liên hệ</Divider>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Chủ địa điểm:</b>{' '}
            {capitalizeName(ownerInfo?.userId?.fullName) || 'Chưa cập nhật'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Số điện thoại:</b> {ownerInfo?.phone || 'Chưa cập nhật'}
          </Paragraph>
        </Col>
      </Row>
      {/* Loại phòng */}
      {roomTypes?.length > 0 && (
        <>
          <Divider style={{ fontSize: '20px' }}>Các loại phòng</Divider>
          <List
            dataSource={roomTypes}
            bordered
            renderItem={(r) => (
              <List.Item>
                <span>{r.name}</span> -{' '}
                <b>{r.pricePerNight?.toLocaleString()} VND/đêm</b>
              </List.Item>
            )}
          />
        </>
      )}
      {/* Dịch vụ */}
      {services?.length > 0 && (
        <>
          <Divider style={{ fontSize: '20px' }}>
            Các dịch vụ địa điểm cung cấp
          </Divider>
          <List
            dataSource={services}
            bordered
            renderItem={(s) => (
              <List.Item>
                <span>{s.name}</span> - <b>{s.price.toLocaleString()} VND</b>
              </List.Item>
            )}
          />
        </>
      )}
      <PlaceRelative currentPlace={place} />
    </Content>
  );
}

export default PlaceDetail;
