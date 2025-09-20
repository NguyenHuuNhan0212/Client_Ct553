import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
  BarChartOutlined
} from '@ant-design/icons';

import Info from '../../components/Profile/Info';
import Payment from '../../components/Profile/Payment';
import Booking from '../../components/Profile/Booking';
import ItineraryComponent from '../../components/Profile/Itinerary';
import ServiceProvide from '../../components/Profile/ServiceOfUser';
import ServiceBookingList from '../../components/Profile/ServiceBookingList';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { getInfoUser } from '../../redux/slices/userSlice';
const { Content, Sider } = Layout;

export default function Profile() {
  const { container, sidebar, content } = styles;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy key menu từ query
  const defaultKey = params.get('tab') || '1';
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
    { key: '2', icon: <CalendarOutlined />, label: 'Lịch trình' },
    { key: '3', icon: <ShoppingCartOutlined />, label: 'Đơn đặt dịch vụ' },
    { key: '4', icon: <CreditCardOutlined />, label: 'Thanh toán' }
  ];

  if (user?.role === 'provider') {
    menuItems.push(
      { key: '5', icon: <AppstoreOutlined />, label: 'Dịch vụ của tôi' },
      { key: '6', icon: <BarChartOutlined />, label: 'Thống kê dịch vụ' }
    );
  }
  // Gia lap
  const mockItinerary = {
    itineraryId: 1,
    title: 'Hành trình Hà Nội - Hạ Long',
    numDays: 3,
    details: [
      {
        detailId: 1,
        visitDay: 1,
        note: 'Khởi hành từ Hà Nội',
        places: [
          {
            name: 'Văn Miếu',
            type: 'Historical',
            description: 'Trường đại học đầu tiên của Việt Nam',
            imageUrl:
              'https://media-cdn.tripadvisor.com/media/photo-s/15/41/05/9d/temple-of-literature.jpg'
          },
          {
            name: 'Hồ Gươm',
            type: 'Nature',
            description: 'Trái tim thủ đô',
            imageUrl: 'https://static.vinwonders.com/2022/05/ho-hoan-kiem-1.jpg'
          }
        ]
      },
      {
        detailId: 2,
        visitDay: 2,
        note: 'Tham quan và nghỉ đêm trên du thuyền',
        places: [
          {
            name: 'Vịnh Hạ Long',
            type: 'Nature',
            description: 'Kỳ quan thiên nhiên thế giới',
            imageUrl:
              'https://ik.imagekit.io/tvlk/blog/2022/08/vinh-ha-long-3.jpg'
          },
          {
            name: 'Hang Sửng Sốt',
            type: 'Cave',
            description: 'Một trong những hang đẹp nhất Hạ Long',
            imageUrl:
              'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/18.jpg'
          }
        ]
      },
      {
        detailId: 3,
        visitDay: 3,
        note: 'Mua sắm và trở về',
        places: [
          {
            name: 'Chợ đêm Hạ Long',
            type: 'Shopping',
            description: 'Địa điểm mua quà lưu niệm nổi tiếng',
            imageUrl:
              'https://ik.imagekit.io/tvlk/blog/2022/07/cho-dem-ha-long-2.jpg'
          }
        ]
      }
    ]
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Info user={user} />;
      case '2':
        return <ItineraryComponent itinerary={mockItinerary} />;
      case '3':
        return <Booking />;
      case '4':
        return <Payment />;
      case '5':
        return <ServiceProvide />;
      case '6':
        return <ServiceBookingList />;
      default:
        return null;
    }
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    navigate(`/profile?tab=${e.key}`);
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(getInfoUser());
    }
  }, [user, token, dispatch]);
  useEffect(() => {
    setSelectedKey(params.get('tab'));
  }, [params]);
  return (
    <>
      <Header />
      <Layout className={container}>
        <Sider className={sidebar}>
          <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content className={content}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 10 }} // trạng thái ban đầu
                animate={{ opacity: 1, y: 0 }} // animation khi xuất hiện
                exit={{ opacity: 0, y: -10 }} // animation khi biến mất
                transition={{ duration: 0.25 }} // tốc độ
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
