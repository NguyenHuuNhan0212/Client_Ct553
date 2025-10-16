import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createItinerary } from '../../redux/slices/itinerarySlice';
import dayjs from 'dayjs';

import ItineraryForm from './ItineraryForm';
import DayActivities from './DayActivities';
import PlaceList from './PlaceList';
import { useNavigate } from 'react-router-dom';
import { getPlacesByAddressAndType } from '../../redux/slices/placeSlice';
import { motion, AnimatePresence } from 'motion/react'; // eslint-disable-line
export default function CreateItineraryPro() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('itineraryForm');
    return (
      JSON.parse(saved) || {
        title: '',
        destination: '',
        creatorName: '',
        startDate: '',
        endDate: '',
        numDays: 0,
        details: []
      }
    );
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.place);
  const { token } = useSelector((state) => state.auth);
  // 🧮 Tính số ngày
  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2) return;
    const [start, end] = dates;
    const diff = dayjs(end).diff(dayjs(start), 'day') + 1;

    setForm({
      ...form,
      startDate: start,
      endDate: end,
      numDays: diff,
      details: Array.from({ length: diff }, (_, i) => ({
        day: i + 1,
        activities: []
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
      if (token) {
        dispatch(
          createItinerary({
            title: form.title,
            destination: form.destination,
            creatorName: form.creatorName,
            startDate: form.startDate,
            endDate: form.endDate,
            numDays: form.numDays,
            details
          })
        );
        navigate('/profile?tab=2');
        message.success('Tạo lịch trình thành công 🎉');
        localStorage.removeItem('itineraryForm');
      } else {
        message.success('Đăng nhập để tạo lịch trình.');
        navigate('/login');
      }
    } catch (err) {
      message.error('Lỗi khi tạo lịch trình', err);
    }
  };
  useEffect(() => {
    dispatch(
      getPlacesByAddressAndType({ address: form.destination, type: 'all' })
    );
  }, [dispatch, form.destination]);
  useEffect(() => {
    localStorage.setItem('itineraryForm', JSON.stringify(form));
  }, [form]);
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0, y: 20 }} // trạng thái ban đầu
        animate={{ opacity: 1, y: 0 }} // animation khi xuất hiện
        exit={{ opacity: 0, y: -10 }} // animation khi biến mất
        transition={{ duration: 0.5 }} // tốc độ
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
