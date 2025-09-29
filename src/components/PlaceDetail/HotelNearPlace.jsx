import { Col, Divider, Row } from 'antd';
import ServiceCard from '../Service/ServiceCard';
import { useEffect, useState } from 'react';
import hotelApi from '../../apis/hotelService';

function HotelNearPlace({ currentPlace }) {
  const [hotels, setHotels] = useState([]);
  const data = { address: currentPlace.address };
  useEffect(() => {
    const fetchData = async (data) => {
      const res = await hotelApi.getHotelsNearPlace(data);
      setHotels(res.hotels);
    };
    fetchData(data);
  }, [currentPlace]); // eslint-disable-line
  return (
    <>
      {hotels?.length === 0 ? (
        ''
      ) : (
        <>
          <Divider style={{ fontSize: '24px' }}>
            Địa điểm lưu trú gần đó
          </Divider>
          {hotels?.length > 0 && (
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
              {hotels?.map((s) => (
                <Col key={s._id} xs={24} sm={12} md={8} lg={6}>
                  <ServiceCard {...s} isHotel />
                </Col>
              ))}
            </Row>
          )}{' '}
        </>
      )}
    </>
  );
}

export default HotelNearPlace;
