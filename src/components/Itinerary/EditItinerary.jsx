import React, { useEffect, useState } from 'react';
import { Row, Col, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'motion/react'; // eslint-disable-line

import ItineraryForm from './ItineraryForm';
import DayActivities from './DayActivities';
import PlaceList from './PlaceList';
import { getItineraryDetail } from '../../redux/slices/itinerarySlice';
import { getPlacesByAddressAndType } from '../../redux/slices/placeSlice';

export default function EditItinerary() {
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentItinerary, loading } = useSelector((state) => state.itinerary);
  const { places } = useSelector((state) => state.place);
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState(null);

  // 🧭 Lấy chi tiết lịch trình khi vào trang
  useEffect(() => {
    dispatch(getItineraryDetail(itineraryId));
  }, [dispatch, itineraryId]);

  // 🧭 Khi currentItinerary có dữ liệu thì setForm
  useEffect(() => {
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
        creatorName,
        startDate: dayjs(startDate),
        endDate: dayjs(endDate),
        numDays,
        details: formattedDetails
      });
    }
  }, [currentItinerary]);

  // 🧭 Cập nhật danh sách địa điểm khi thay đổi điểm đến
  useEffect(() => {
    if (form?.destination) {
      dispatch(
        getPlacesByAddressAndType({ address: form.destination, type: 'all' })
      );
    }
  }, [dispatch, form?.destination]);

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

  // 🧭 Thêm địa điểm
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

  // 🧭 Xóa hoạt động
  const removeActivity = (dayIndex, actIndex) => {
    const updated = [...form.details];
    updated[dayIndex].activities.splice(actIndex, 1);
    setForm({ ...form, details: updated });
  };

  // 🧭 Lưu chỉnh sửa
  const handleSave = async () => {
    if (!form.title || !form.creatorName || !form.startDate || !form.endDate) {
      return message.error('Vui lòng nhập đầy đủ thông tin!');
    }

    // const details = form.details.flatMap((d) =>
    //   d.activities.map((a, actIndex) => ({
    //     placeId: a.placeId,
    //     visitDay: d.day,
    //     note: a.note,
    //     startTime: a.startTime,
    //     endTime: a.endTime,
    //     order: actIndex + 1
    //   }))
    // );

    try {
      if (token) {
        // await dispatch(
        //   updateItinerary({
        //     itineraryId,
        //     data: {
        //       title: form.title,
        //       destination: form.destination,
        //       creatorName: form.creatorName,
        //       startDate: form.startDate,
        //       endDate: form.endDate,
        //       numDays: form.numDays,
        //       details
        //     }
        //   })
        // );
        message.success('Cập nhật lịch trình thành công 🎉');
        navigate('/profile?tab=2');
      } else {
        message.warning('Vui lòng đăng nhập để chỉnh sửa.');
        navigate('/login');
      }
    } catch (err) {
      message.error('Lỗi khi cập nhật lịch trình', err);
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
