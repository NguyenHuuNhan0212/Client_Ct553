import React, { useEffect } from 'react';
import { Tabs, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Info from '../../components/Profile/Info';
import Itinerary from '../../components/Profile/Itinerary';
import Booking from '../../components/Profile/Booking';
import Payment from '../../components/Profile/Payment';
import ServiceProvide from '../../components/Profile/ServiceOfUser';
import ServiceBookingList from '../../components/Profile/ServiceBookingList';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser } from '../../redux/slices/authSlice';

const { Title } = Typography;

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeKey = params.get('tab') || '1';

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: (
        <Info
          fullName={user?.fullName}
          email={user?.email}
          role={user?.role}
          avatarUrl={
            user?.avatarUrl ? user?.avatarUrl : '/uploads/default-avatar.jpg'
          }
        />
      )
    },
    {
      key: '2',
      label: 'Lịch trình',
      children: <Itinerary />
    },
    {
      key: '3',
      label: 'Đơn đặt dịch vụ',
      children: <Booking />
    },
    {
      key: '4',
      label: 'Thanh toán',
      children: <Payment />
    }
  ];

  if (user?.role === 'provider') {
    tabItems.push(
      {
        key: '5',
        label: 'Dịch vụ của tôi',
        children: <ServiceProvide />
      },
      {
        key: '6',
        label: 'Thống kê dịch vụ',
        children: <ServiceBookingList />
      }
    );
  }

  const handleTabChange = (key) => {
    navigate(`/profile?tab=${key}`);
  };
  useEffect(() => {
    if (token && !user) {
      dispatch(getInfoUser());
    }
  }, [user, token, dispatch]);
  return (
    <>
      <Header />
      <div style={{ maxWidth: 1000, margin: '30px auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          Trang thông tin cá nhân
        </Title>
        <Tabs
          activeKey={activeKey}
          onChange={handleTabChange}
          items={tabItems}
          type='card'
        />
      </div>
    </>
  );
}
