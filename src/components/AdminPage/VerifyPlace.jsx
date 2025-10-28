import { useEffect, useState } from 'react';
import ListPlaceAwaitingApprove from './DashboardComponents/ListPlaceAwaitingApprove';
import placeApi from '../../apis/placeService';

function VerifyPlace() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await placeApi.getAllAdmin();
        setPlaces(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy danh sách place');
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <ListPlaceAwaitingApprove places={places} setPlaces={setPlaces} />
    </>
  );
}

export default VerifyPlace;
