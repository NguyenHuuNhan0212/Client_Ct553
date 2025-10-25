import { Col, message, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ItineraryForm from './ItineraryForm';
import DayActivities from './DayActivities';
import PlaceList from './PlaceList';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPlacesByAddressAndType } from '../../redux/slices/placeSlice';
import { createItinerary } from '../../redux/slices/itinerarySlice';
import { useNavigate } from 'react-router-dom';

function EditItineraryByChatbot({ isTripPlan = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripPlan, city } = useSelector((state) => state.chat);
  const { tripPlan: planAI, itineraryInfoAI } = useSelector(
    (state) => state.itinerary
  );
  const { places } = useSelector((state) => state.place);
  const [form, setForm] = useState({
    title: '',
    creatorName: '',
    destination: '',
    startDate: '',
    endDate: '',
    numDays: 0,
    details: []
  });
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
      await dispatch(createItinerary(data)).unwrap();
      navigate('/profile?tab=2');
      message.success('Tạo lịch trình thành công.');
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (!isTripPlan) {
      if (tripPlan && tripPlan.length > 0) {
        const details = tripPlan.map((dayData) => ({
          day: dayData.day,
          activities: dayData.activities.map((a) => ({
            placeId: a.placeId,
            placeName: a.name,
            address: a.address,
            note: '',
            image: a.image,
            services: a.services || [],
            startTime: '',
            endTime: ''
          }))
        }));
        setForm({
          title: `Lịch trình khám phá ${city || 'chưa đặt tên'}`,
          creatorName: '',
          destination: city || '',
          startDate: '',
          endDate: '',
          numDays: tripPlan.length,
          details
        });
      }
    }
  }, [tripPlan, city, isTripPlan]);
  useEffect(() => {
    if (isTripPlan) {
      if (planAI && planAI.length > 0) {
        const details = planAI.map((dayData) => ({
          day: dayData.day,
          activities: dayData.activities.map((a) => ({
            placeId: a.placeId,
            placeName: a.name,
            address: a.address,
            note: '',
            image: a.image,
            services: a.services || [],
            startTime: '',
            endTime: ''
          }))
        }));
        setForm({
          title: itineraryInfoAI.title || '',
          creatorName: itineraryInfoAI.creatorName || '',
          destination: itineraryInfoAI.destination || '',
          startDate: itineraryInfoAI.startDate || '',
          endDate: itineraryInfoAI.endDate || '',
          numDays: planAI.length,
          details
        });
      }
    }
  }, [planAI, itineraryInfoAI, isTripPlan]);
  useEffect(() => {
    if (form?.destination) {
      dispatch(
        getPlacesByAddressAndType({ address: form.destination, type: 'all' })
      );
    }
  }, [dispatch, form?.destination]);
  console.log(form);
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
          <PlaceList form={form} places={places} addActivity={addActivity} />
        </Col>
      </Row>
    </div>
  );
}

export default EditItineraryByChatbot;
