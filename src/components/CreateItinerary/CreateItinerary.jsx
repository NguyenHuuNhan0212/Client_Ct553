import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createItinerary } from '../../redux/slices/itinerarySlice';
import dayjs from 'dayjs';

import ItineraryForm from './ItineraryForm';
import DayActivities from './DayActivities';
import PlaceList from './PlaceList';
import { useNavigate } from 'react-router-dom';

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
  const [places, setPlaces] = useState([]);
  const dispatch = useDispatch();
  const placeList = useSelector((state) => state.place.places);

  useEffect(() => {
    setPlaces(placeList || []);
  }, [placeList]);

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

  // ➕ Thêm hoạt động
  const addActivity = (dayIndex, place) => {
    const updated = [...form.details];
    updated[dayIndex].activities.push({
      placeId: place._id,
      placeName: place.name,
      note: '',
      startTime: '',
      endTime: ''
    });
    setForm({ ...form, details: updated });
    message.success(`Đã thêm ${place.name} vào Ngày ${dayIndex + 1}`);
  };

  // ❌ Xóa hoạt động
  const removeActivity = (dayIndex, actIndex) => {
    const updated = [...form.details];
    updated[dayIndex].activities.splice(actIndex, 1);
    setForm({ ...form, details: updated });
  };

  // 💾 Lưu lịch trình
  const handleSave = async () => {
    if (!form.title || !form.creatorName || !form.startDate || !form.endDate) {
      return message.error('Vui lòng nhập đầy đủ thông tin!');
    }

    const details = form.details.flatMap((d) =>
      d.activities.map((a) => ({
        placeId: a.placeId,
        visitDay: `Ngày ${d.day}`,
        note: a.note,
        startTime: a.startTime,
        endTime: a.endTime
      }))
    );

    try {
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

      message.success('Tạo lịch trình thành công 🎉');
      navigate('/profile?tab=2');
      localStorage.removeItem('itineraryForm');
    } catch (err) {
      message.error('Lỗi khi tạo lịch trình', err);
    }
  };
  // 💾 Lưu form vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('itineraryForm', JSON.stringify(form));
  }, [form]);

  return (
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
            removeActivity={removeActivity}
            handleSave={handleSave}
          />
          <DayActivities
            form={form}
            setForm={setForm}
            removeActivity={removeActivity}
          />
        </Col>

        <Col xs={24} lg={10}>
          <PlaceList form={form} places={places} addActivity={addActivity} />
        </Col>
      </Row>
    </div>
  );
}
