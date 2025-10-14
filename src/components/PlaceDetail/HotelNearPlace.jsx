import { Col, Divider, Row } from 'antd';
import ServiceCard from '../Service/ServiceCard';
import { useEffect, useState } from 'react';
import hotelApi from '../../apis/hotelService';
import ServiceList from '../Service/ServiceList';

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
          <div style={{ margin: '10px' }}>
            <Divider style={{ fontSize: '24px' }}>
              Địa điểm lưu trú gần đó
            </Divider>
            {hotels?.length > 0 && <ServiceList places={hotels} isSlick />}
          </div>
        </>
      )}
    </>
  );
}

export default HotelNearPlace;
