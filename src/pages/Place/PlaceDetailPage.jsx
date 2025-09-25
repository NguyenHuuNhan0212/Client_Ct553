import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlace } from '../../redux/slices/placeSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PlaceDetail from '../../components/PlaceDetail/PlaceDetail';
function PlaceDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPlace } = useSelector((state) => state.place);

  useEffect(() => {
    dispatch(getOnePlace(id));
  }, [id, dispatch]);
  if (!currentPlace) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <PlaceDetail currentPlace={currentPlace} />
      <Footer />
    </>
  );
}

export default PlaceDetailPage;
