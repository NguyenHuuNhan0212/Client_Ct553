import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Typography, List, Row, Col, Divider, Layout, Tag } from 'antd';
import { capitalizeName } from '../../utils/capitalize';
import PlaceRelative from './PlaceRelative';
import HotelNearPlace from './HotelNearPlace';
import ServiceOfPlace from './ServiceOfPlace';
const { Content } = Layout;
const { Title, Paragraph } = Typography;

function PlaceDetail({ currentPlace }) {
  const [mainImage, setMainImage] = useState(null);

  const { info, services, ownerInfo } = currentPlace;
  useEffect(() => {
    if (info?.images?.length > 0) {
      setMainImage(`http://localhost:3000/${info.images[0]}`);
    }
  }, [info]);
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
          {info?.images?.map((img, idx) => (
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
          <Title level={2}>{capitalizeName(info?.name)}</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Địa chỉ:</b> {info?.address}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Loại địa điểm: </b>{' '}
            {info?.type === 'touristSpot'
              ? 'Địa điểm du lịch'
              : info?.type === 'cafe'
              ? 'Quán cafe'
              : info?.type === 'restaurant'
              ? 'Địa điểm ăn uống'
              : 'Khách sạn, nhà nghĩ'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Trạng thái hoạt động: </b>{' '}
            <Tag
              style={{ fontSize: '16px' }}
              color={info?.isActive ? 'green' : 'red'}
            >
              {info?.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </Tag>
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Giới thiệu địa điểm: </b>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(info?.description || '')
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
      {/* Dịch vụ */}
      {services?.length > 0 && <ServiceOfPlace services={services} />}
      <PlaceRelative currentPlace={info} isHotel={!info.type} />
      {info.type && <HotelNearPlace currentPlace={info} />}
    </Content>
  );
}

export default PlaceDetail;
