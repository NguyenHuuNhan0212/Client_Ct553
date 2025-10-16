import React, { useEffect, useState } from 'react';
import { Badge, Layout, Menu, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react'; // eslint-disable-line
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  HeartOutlined
} from '@ant-design/icons';

import Info from '../../components/Profile/Info';
import Booking from '../../components/Profile/Booking';
import ItineraryComponent from '../../components/Profile/Itinerary';
import ServiceProvide from '../../components/Profile/ServiceOfUser';
import BookingList from '../../components/Profile/ServiceBookingList';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { getInfoUser } from '../../redux/slices/userSlice';
import PlaceFavorite from '../../components/Profile/Favorite';
const { Content, Sider } = Layout;

export default function Profile() {
  const { container, sidebar, content } = styles;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { search } = useLocation();
  const params = new URLSearchParams(search); // eslint-disable-line
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { placesFavorite } = useSelector((state) => state.place);
  // Lấy key menu từ query
  const defaultKey = params.get('tab') || '1';
  const [selectedKey, setSelectedKey] = useState(defaultKey);

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
    { key: '2', icon: <CalendarOutlined />, label: 'Lịch trình của tôi' },
    { key: '3', icon: <ShoppingCartOutlined />, label: 'Lịch sử đặt dịch vụ' },
    {
      key: '4',
      icon: <HeartOutlined />,
      label: (
        <Badge count={placesFavorite.length} offset={[20, 0]} showZero>
          <span>Địa điểm yêu thích </span>
        </Badge>
      )
    }
  ];

  if (user?.role !== 'user') {
    menuItems.push(
      {
        key: '5',
        icon: <AppstoreOutlined />,
        label: 'Quản lý địa điểm/dịch vụ'
      },
      {
        key: '6',
        icon: <BarChartOutlined />,
        label: 'Danh sách đặt dịch vụ'
      }
    );
  }

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Info user={user} />;
      case '2':
        return <ItineraryComponent />;
      case '3':
        return <Booking />;
      case '4':
        return <PlaceFavorite />;
      case '5':
        return <ServiceProvide />;
      case '6':
        return <BookingList />;
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
        <Sider className={sidebar} width={240}>
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
                initial={{ opacity: 0, y: 20 }} // trạng thái ban đầu
                animate={{ opacity: 1, y: 0 }} // animation khi xuất hiện
                exit={{ opacity: 0, y: -10 }} // animation khi biến mất
                transition={{ duration: 0.35 }} // tốc độ
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
