import { Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import placeApi from '../../apis/placeService';
import ServiceCard from '../Service/ServiceCard';
function PlaceRelative({ currentPlace }) {
  const province = currentPlace.address.split(',')[1];
  const [places, setPlaces] = useState([]);
  const data = {
    _id: currentPlace._id,
    type: currentPlace.type,
    address: province
  };
  useEffect(() => {
    const fetchData = async (data) => {
      const res = await placeApi.getPlaceRelative(data);
      setPlaces(res.places);
    };
    fetchData(data);
  }, [currentPlace]);
  console.log(places);
  return (
    <>
      <Divider style={{ fontSize: '24px' }}>Địa điểm tương tự</Divider>
      {places?.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          {places?.map((s) => (
            <Col key={s._id} xs={24} sm={12} md={8} lg={6}>
              <ServiceCard {...s} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default PlaceRelative;
