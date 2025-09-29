import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PlaceDetail from '../../components/PlaceDetail/PlaceDetail';
import { getOneHotel } from '../../redux/slices/hotelSlice';
function HotelDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentHotel } = useSelector((state) => state.hotel);

  console.log(currentHotel);
  useEffect(() => {
    dispatch(getOneHotel(id));
  }, [id, dispatch]);
  if (!currentHotel) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <PlaceDetail currentPlace={currentHotel} />
      <Footer />
    </>
  );
}

export default HotelDetailPage;
