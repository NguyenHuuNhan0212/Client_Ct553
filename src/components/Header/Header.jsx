import { Layout, Menu, Dropdown, Button, Drawer, Divider, Badge } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  FileDoneOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  MenuOutlined,
  HomeOutlined,
  BankOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  HeartOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getInfoUser } from '../../redux/slices/userSlice';
import { logout } from '../../redux/slices/authSlice';
import { capitalizeName } from '../../utils/capitalize';
import { getPlacesFavorite, setPlaceType } from '../../redux/slices/placeSlice';

const { Header: AntHeader } = Layout;

export default function Header() {
  const { container, logo } = styles;
  const navigate = useNavigate();
  const location = useLocation();
  const username = JSON.parse(sessionStorage.getItem('username')) || null;
  const { token } = useSelector((state) => state.auth);
  const { user, avatar } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { placesFavorite } = useSelector((state) => state.place);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Menu trái
  const leftMenuItems = [
    {
      key: 'home',
      icon: isMobile ? <HomeOutlined /> : null,
      label: (
        <Link to='/' style={{ fontSize: '16px', fontWeight: '600' }}>
          Trang chủ
        </Link>
      )
    },
    {
      key: 'hotels',
      icon: isMobile ? <BankOutlined /> : null,
      label: (
        <Link
          to='/hotels'
          onClick={() => dispatch(setPlaceType({ type: 'hotel' }))}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          Khách sạn
        </Link>
      )
    },
    {
      key: 'restaurants',
      icon: isMobile ? <CreditCardOutlined /> : null,
      label: (
        <Link
          to='/restaurants'
          onClick={() => dispatch(setPlaceType({ type: 'restaurant' }))}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          Nhà hàng & Quán ăn
        </Link>
      )
    },
    {
      key: 'cafes',
      icon: isMobile ? <CoffeeOutlined /> : null,
      label: (
        <Link
          to='/cafes'
          onClick={() => dispatch(setPlaceType({ type: 'cafe' }))}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          Cafe & Chill
        </Link>
      )
    },
    {
      key: 'touristSpots',
      icon: isMobile ? <EnvironmentOutlined /> : null,
      label: (
        <Link
          to='/touristSpots'
          onClick={() => dispatch(setPlaceType({ type: 'touristSpot' }))}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          Địa điểm du lịch
        </Link>
      )
    },
    {
      key: 'itinerary',
      icon: isMobile ? <CalendarOutlined /> : null,
      label: (
        <Link to='/itinerary' style={{ fontSize: '16px', fontWeight: '600' }}>
          Tạo lịch trình
        </Link>
      )
    },
    ...(user?.role === 'provider'
      ? [
          {
            key: 'add-place',
            icon: isMobile ? <PlusCircleOutlined /> : null,
            label: (
              <Link
                to='/add-place'
                style={{ fontSize: '16px', fontWeight: '600' }}
              >
                Thêm địa điểm
              </Link>
            )
          }
        ]
      : [])
  ];

  const userMenu = {
    items: [
      {
        key: 'info',
        icon: <UserOutlined />,
        label: <Link to='/profile?tab=1'>Thông tin cá nhân</Link>
      },
      {
        key: 'itinerary',
        icon: <ScheduleOutlined />,
        label: <Link to='/profile?tab=2'>Lịch trình</Link>
      },
      {
        key: 'booking',
        icon: <FileDoneOutlined />,
        label: <Link to='/profile?tab=3'>Lịch sử đặt dịch vụ</Link>
      },
      {
        key: 'favorite',
        icon: <HeartOutlined />,
        label: (
          <Link to='/profile?tab=4'>
            <Badge count={placesFavorite.length} offset={[15, 0]} showZero>
              <span>Địa điểm yêu thích </span>
            </Badge>
          </Link>
        )
      },

      ...(user?.role === 'provider'
        ? [
            {
              key: 'services',
              icon: <AppstoreOutlined />,
              label: <Link to='/profile?tab=5'>Quản lý địa điểm</Link>
            },
            {
              key: 'stats',
              icon: <BarChartOutlined />,
              label: <Link to='/profile?tab=6'>Danh sách đặt dịch vụ</Link>
            }
          ]
        : []),
      { type: 'divider' },
      {
        key: 'logout',
        icon: <LogoutOutlined style={{ color: 'red' }} />,
        label: <span onClick={handleLogout}>Đăng xuất</span>
      }
    ]
  };

  useEffect(() => {
    if (token && !user) {
      dispatch(getInfoUser());
      dispatch(getPlacesFavorite());
    }
  }, [token, user, dispatch]);

  return (
    <AntHeader
      className={container}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {/* Logo */}
      <div className={logo}>
        <Link to='/' style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>
          Vigo Travel
        </Link>
      </div>

      {/* Menu trái */}
      {!isMobile && (
        <Menu
          theme='dark'
          mode='horizontal'
          items={leftMenuItems}
          selectedKeys={[location.pathname.split('/')[1] || 'home']}
          style={{
            background: 'transparent',
            flex: 1,
            marginLeft: 30
          }}
        />
      )}

      {/* Nút menu mobile */}
      {isMobile && (
        <Button
          type='text'
          icon={<MenuOutlined style={{ color: 'white', fontSize: 22 }} />}
          onClick={() => setOpenDrawer(true)}
          style={{ marginLeft: 'auto' }}
        />
      )}

      {/* Menu phải */}
      {user ? (
        <Dropdown
          menu={userMenu}
          placement='bottomRight'
          overlayStyle={{
            maxHeight: 'none',
            overflow: 'visible',
            width: '200px' // hoặc auto
          }}
        >
          <span
            style={{
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <img
              src={
                avatar
                  ? `http://localhost:3000${avatar}`
                  : 'http://localhost:3000/uploads/default-avatar.jpg'
              }
              alt='avatar'
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fff'
              }}
            />
            {capitalizeName(username)} <DownOutlined />
          </span>
        </Dropdown>
      ) : (
        !isMobile && (
          <Menu
            theme='dark'
            mode='horizontal'
            items={[
              {
                key: 'login',
                label: (
                  <Link
                    to='/login'
                    style={{ fontSize: '16px', fontWeight: '600' }}
                  >
                    Đăng nhập
                  </Link>
                )
              },
              {
                key: 'register',
                label: (
                  <Link
                    to='/register'
                    style={{ fontSize: '16px', fontWeight: '600' }}
                  >
                    Đăng ký
                  </Link>
                )
              }
            ]}
            style={{
              background: 'transparent'
            }}
          />
        )
      )}

      {/* Drawer menu cho mobile */}
      <Drawer
        placement='right'
        closable
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode='inline'
          items={leftMenuItems}
          selectedKeys={[location.pathname.split('/')[1] || 'home']}
          onClick={() => setOpenDrawer(false)}
        />
        {!user && (
          <>
            <Divider style={{ borderColor: '#1890ff' }} />
            <Menu
              mode='inline'
              items={[
                {
                  key: 'login',
                  label: (
                    <Link
                      to='/login'
                      style={{
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Đăng nhập
                    </Link>
                  )
                },
                {
                  key: 'register',
                  label: (
                    <Link
                      to='/register'
                      style={{
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Đăng ký
                    </Link>
                  )
                }
              ]}
              onClick={() => setOpenDrawer(false)}
            />
          </>
        )}
      </Drawer>
    </AntHeader>
  );
}
