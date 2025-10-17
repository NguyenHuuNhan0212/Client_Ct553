import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from './ItineraryComponents/FilterBar';
import ItineraryList from './ItineraryComponents/ItineraryList';
import ItineraryDetail from './ItineraryComponents/ItineraryDetail';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCurrentItinerary,
  getAllItineraryByUserId
} from '../../redux/slices/itinerarySlice';
import { Button, Empty } from 'antd';

export default function ItineraryComponent() {
  const navigate = useNavigate();
  const { itinerariesOfUser: itineraries, currentItinerary } = useSelector(
    (state) => state.itinerary
  );
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItinerary, setSelectedItinerary] = useState(
    currentItinerary || null
  );
  const dispatch = useDispatch();

  const filtered = itineraries.filter((i) => {
    const matchFilter = selectedFilter === 'all' || i.status === selectedFilter;
    const matchSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
  const handleCreateItinerary = () => {
    navigate('/itinerary');
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
          <h1
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 600,
              marginBottom: 8
            }}
          >
            Lịch trình của tôi
          </h1>
          <p style={{ textAlign: 'center', color: '#777', marginBottom: 24 }}>
            Quản lý và theo dõi các chuyến đi
          </p>

          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {!itineraries.length ? (
            <>
              <Empty description={'Bạn chưa tạo lịch trình du lịch nào.'} />{' '}
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <Button type='primary' onClick={handleCreateItinerary}>
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
    </div>
  );
}
