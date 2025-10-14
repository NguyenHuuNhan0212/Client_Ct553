import { Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import placeApi from '../../apis/placeService';
import ServiceList from '../Service/ServiceList';
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
  }, [currentPlace]); //eslint-disable-line
  return (
    <>
      {places?.length === 0 ? (
        ''
      ) : (
        <>
          <div style={{ margin: '10px' }}>
            <Divider style={{ fontSize: '24px' }}>Địa điểm tương tự</Divider>
            {places?.length > 0 && <ServiceList places={places} isSlick />}
          </div>
        </>
      )}
    </>
  );
}

export default PlaceRelative;
