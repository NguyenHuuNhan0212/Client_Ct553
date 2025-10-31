import React, { useEffect, useState } from 'react';
import { Row, Col, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'motion/react'; // eslint-disable-line

import ItineraryForm from './ItineraryForm';
import DayActivities from './DayActivities';
import PlaceList from './PlaceList';
import {
  createItinerary,
  getAllItineraryByUserId,
  getItineraryDetail,
  updateItinerary
} from '../../redux/slices/itinerarySlice';
import { getPlacesByAddressAndType } from '../../redux/slices/placeSlice';

export default function EditItinerary() {
  const { itineraryId } = useParams();
  const LOCAL_KEY = `editItinerary_${itineraryId}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentItinerary, loading, isCopy } = useSelector(
    (state) => state.itinerary
  );
  const { places } = useSelector((state) => state.place);
  const { user } = useSelector((state) => state.user);
  const [form, setForm] = useState(null);
  useEffect(() => {
    dispatch(getItineraryDetail(itineraryId));
  }, [dispatch, itineraryId]);
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);

    if (saved) {
      setForm(JSON.parse(saved));
      return;
    }

    if (currentItinerary) {
      const {
        title,
        destination,
        creatorName,
        startDate,
        endDate,
        numDays,
        itineraryDetail
      } = currentItinerary;
      const formattedDetails = itineraryDetail.map((d, index) => ({
        day: index + 1,
        activities: d.places.map((p) => ({
          placeId: p.placeId?._id,
          placeName: p.name,
          address: p.address,
          note: p.note,
          image: p.images?.[0],
          startTime: p.duration.split('-')[0]?.trim() || '',
          endTime: p.duration.split('-')[1]?.trim() || ''
        }))
      }));

      setForm({
        title,
        destination,
        creatorName: isCopy ? '' : creatorName,
        startDate: isCopy
          ? ''
          : !itineraryDetail.length
          ? ''
          : dayjs(startDate),
        endDate: isCopy ? '' : !itineraryDetail.length ? '' : dayjs(endDate),
        numDays: !itineraryDetail.length ? 0 : numDays,
        details: formattedDetails
      });
    }
  }, [currentItinerary, isCopy, LOCAL_KEY]);

  useEffect(() => {
    if (form?.destination) {
      dispatch(
        getPlacesByAddressAndType({ address: form.destination, type: 'all' })
      );
    }
  }, [dispatch, form?.destination]);
  useEffect(() => {
    if (form) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(form));
    }
  }, [form, LOCAL_KEY]);
  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2) {
      setForm({
        ...form,
        startDate: '',
        endDate: '',
        numDays: 0,
        details: []
      });
      return;
    }
    const [start, end] = dates;
    const diff = dayjs(end).diff(dayjs(start), 'day') + 1;

    setForm({
      ...form,
      startDate: start,
      endDate: end,
      numDays: diff,
      details: Array.from({ length: diff }, (_, i) => ({
        day: i + 1,
        activities: form.details[i]?.activities || []
      }))
    });
  };

  const addActivity = (dayIndex, place) => {
    const updated = [...form.details];
    updated[dayIndex].activities.push({
      placeId: place._id,
      placeName: place.name,
      address: place.address,
      note: '',
      image: place.images[0],
      services: place.services || [],
      startTime: '',
      endTime: ''
    });
    setForm({ ...form, details: updated });
    message.success(`Đã thêm ${place.name} vào Ngày ${dayIndex + 1}`);
  };

  const removeActivity = (dayIndex, actIndex) => {
    const updated = [...form.details];
    updated[dayIndex].activities.splice(actIndex, 1);
    setForm({ ...form, details: updated });
  };

  const handleSave = async () => {
    if (!form.title || !form.creatorName || !form.startDate || !form.endDate) {
      return message.error('Vui lòng nhập đầy đủ thông tin!');
    }
    if (form.details.some((d) => d.activities.length === 0)) {
      return message.error('Mỗi ngày phải có ít nhất 1 địa điểm!');
    }

    const details = form.details.flatMap((d) =>
      d.activities.map((a, actIndex) => ({
        placeId: a.placeId,
        visitDay: d.day,
        note: a.note,
        startTime: a.startTime,
        endTime: a.endTime,
        order: actIndex + 1
      }))
    );

    try {
      const data = {
        title: form.title,
        destination: form.destination,
        startDate: form.startDate,
        creatorName: form.creatorName,
        endDate: form.endDate,
        details: details
      };
      if (user?._id.toString() === currentItinerary?.userId.toString()) {
        await dispatch(updateItinerary({ itineraryId, data: data })).unwrap();
        message.success('Cập nhật lịch trình thành công.');
      } else {
        await dispatch(createItinerary(data)).unwrap();
        message.success('Sao chép lịch trình thành công.');
      }
      await dispatch(getAllItineraryByUserId()).unwrap();
      navigate('/profile?tab=2');
      localStorage.removeItem(LOCAL_KEY);
    } catch (err) {
      message.error(err.message);
    }
  };

  if (loading || !form) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size='large' />
      </div>
    );
  }
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            padding: '24px 40px',
            background: '#f7f9fb',
            minHeight: '100vh',
            marginTop: 65
          }}
        >
          <Row gutter={10}>
            <Col xs={24} lg={14}>
              <ItineraryForm
                form={form}
                setForm={setForm}
                handleDateChange={handleDateChange}
                handleSave={handleSave}
                isEdit
              />
              <DayActivities
                form={form}
                setForm={setForm}
                removeActivity={removeActivity}
              />
            </Col>

            <Col xs={24} lg={10}>
              <PlaceList
                form={form}
                places={places}
                addActivity={addActivity}
              />
            </Col>
          </Row>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
