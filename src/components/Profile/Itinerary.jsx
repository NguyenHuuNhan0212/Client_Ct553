import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from './ItineraryComponents/FilterBar';
import ItineraryList from './ItineraryComponents/ItineraryList';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCurrentItinerary,
  getAllItineraryByUserId
} from '../../redux/slices/itinerarySlice';
import { Button, Empty, Typography } from 'antd';
import ItineraryDetail from './ItineraryComponents/ItineraryDetail';
import CreateItineraryChoiceModal from '../Banner/CreateItineraryModal';
import TripPlanFormWithAI from '../Banner/CreateItineraryWithAI';

const { Title } = Typography;
export default function ItineraryComponent() {
  const navigate = useNavigate();
  const { itinerariesOfUser: itineraries, currentItinerary } = useSelector(
    (state) => state.itinerary
  );
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenModalCreateItinerary, setIsOpenModalCreateItinerary] =
    useState(false);
  const [
    isOpenModalCreateItineraryWithAI,
    setIsOpenModalCreateItineraryWithAI
  ] = useState(false);

  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const dispatch = useDispatch();

  const filtered = itineraries.filter((i) => {
    const matchFilter = selectedFilter === 'all' || i.status === selectedFilter;
    const matchSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
  const handleCreateItinerary = () => {
    setIsOpenModalCreateItinerary(true);
  };
  const handleSelectOption = (type) => {
    setIsOpenModalCreateItinerary(false);
    if (type === 'manual') {
      navigate('/itinerary');
    } else {
      setIsOpenModalCreateItineraryWithAI(true);
    }
  };
  useEffect(() => {
    dispatch(getAllItineraryByUserId());
  }, [dispatch, currentItinerary]);

  return (
    <div
      style={{
        padding: 24,
        background: '#f5f7fa',
        borderRadius: 5,
        minHeight: '100vh'
      }}
    >
      {!selectedItinerary ? (
        <>
          <Title
            level={1}
            style={{
              textAlign: 'center'
            }}
          >
            Danh sách lịch trình
          </Title>
          <p style={{ textAlign: 'center', color: '#777', marginBottom: 24 }}>
            Quản lý và theo dõi các chuyến đi
          </p>

          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClickCreateItinerary={(value) =>
              setIsOpenModalCreateItinerary(value)
            }
          />
          {!itineraries.length ? (
            <>
              <Empty description={'Bạn chưa tạo lịch trình du lịch nào.'} />{' '}
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <Button type='primary' onClick={() => handleCreateItinerary()}>
                  Tạo lịch trình ngay
                </Button>
              </div>
            </>
          ) : (
            <ItineraryList
              itineraries={filtered}
              onSelect={setSelectedItinerary}
            />
          )}
        </>
      ) : (
        <ItineraryDetail
          itinerary={selectedItinerary}
          onBack={() => {
            setSelectedItinerary(null);
            dispatch(clearCurrentItinerary());
          }}
        />
      )}
      <CreateItineraryChoiceModal
        open={isOpenModalCreateItinerary}
        onCancel={() => setIsOpenModalCreateItinerary(false)}
        onSelect={handleSelectOption}
      />
      <TripPlanFormWithAI
        open={isOpenModalCreateItineraryWithAI}
        onClose={() => setIsOpenModalCreateItineraryWithAI(false)}
      />
    </div>
  );
}
