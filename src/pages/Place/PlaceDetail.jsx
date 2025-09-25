import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, List, Row, Col, Divider } from 'antd';
import { getOnePlace } from '../../redux/slices/placeSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const { Title, Paragraph } = Typography;

function PlaceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlace } = useSelector((state) => state.place);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    dispatch(getOnePlace(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentPlace?.place?.images?.length > 0) {
      setMainImage(`http://localhost:3000/${currentPlace.place.images[0]}`);
    }
  }, [currentPlace]);

  if (!currentPlace) return <div>Loading...</div>;

  const { place, services, roomTypes, ownerInfo } = currentPlace;

  return (
    <>
      <Header />
      <div
        style={{ maxWidth: 1200, margin: '0 auto', marginTop: 64, padding: 20 }}
      >
        <Row gutter={24}>
          {/* Cột trái: thông tin địa điểm */}
          <Col span={16}>
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

            {/* Thông tin chung */}
            <Title level={2}>{place?.name}</Title>
            <Paragraph>
              <b>Địa chỉ:</b> {place?.address}
            </Paragraph>
            <Paragraph>{place?.description}</Paragraph>

            {/* Dịch vụ */}
            {services?.length > 0 && (
              <>
                <Divider orientation='left'>Dịch vụ đi kèm</Divider>
                <List
                  dataSource={services}
                  bordered
                  renderItem={(s) => (
                    <List.Item>
                      <span>{s.name}</span> -{' '}
                      <b>{s.price.toLocaleString()} VND</b>
                    </List.Item>
                  )}
                />
              </>
            )}

            {/* Loại phòng */}
            {roomTypes?.length > 0 && (
              <>
                <Divider orientation='left'>Loại phòng</Divider>
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
          </Col>

          {/* Cột phải: liên hệ */}
          <Col span={8}>
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 80
              }}
            >
              <Title level={4}>Thông tin liên hệ</Title>
              <Paragraph>
                <b>Tên:</b> {ownerInfo?.userId?.fullName || 'Chưa cập nhật'}
              </Paragraph>
              <Paragraph>
                <b>Số điện thoại:</b> {ownerInfo?.phone || 'Chưa cập nhật'}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default PlaceDetail;
