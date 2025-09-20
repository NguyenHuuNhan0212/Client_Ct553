import { Layout, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  FileDoneOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInfoUser } from '../../redux/slices/userSlice';
import { logout } from '../../redux/slices/authSlice';
import { capitalizeName } from '../../utils/capitalize';

const { Header: AntHeader } = Layout;

export default function Header() {
  const { container, logo } = styles;
  const navigate = useNavigate();
  const username = JSON.parse(sessionStorage.getItem('username')) || null;
  const { token } = useSelector((state) => state.auth);
  const { user, avatar } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  // Menu bên trái
  const leftMenuItems = [
    {
      key: 'home',
      label: (
        <Link to='/' style={{ fontSize: '16px', fontWeight: '600' }}>
          Trang chủ
        </Link>
      )
    },
    {
      key: 'about',
      label: (
        <Link to='/about' style={{ fontSize: '16px', fontWeight: '600' }}>
          Giới thiệu
        </Link>
      )
    },
    {
      key: 'services',
      label: (
        <Link to='/services' style={{ fontSize: '16px', fontWeight: '600' }}>
          Dịch vụ
        </Link>
      )
    }
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
        label: <Link to='/profile?tab=3'>Đơn đặt dịch vụ</Link>
      },
      {
        key: 'payment',
        icon: <CreditCardOutlined />,
        label: <Link to='/profile?tab=4'>Thanh toán</Link>
      },
      ...(user?.role === 'provider'
        ? [
            {
              key: 'services',
              icon: <AppstoreOutlined />,
              label: <Link to='/profile?tab=5'>Dịch vụ của tôi</Link>
            },
            {
              key: 'stats',
              icon: <BarChartOutlined />,
              label: <Link to='/profile?tab=6'>Thống kê dịch vụ</Link>
            }
          ]
        : []),
      {
        type: 'divider'
      },
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
    }
  }, [token, user, dispatch]);

  return (
    <AntHeader className={container}>
      <div className={logo}>
        <Link to='/' style={{ color: 'white' }}>
          Vigo Travel
        </Link>
      </div>

      {/* Menu trái */}
      <Menu
        theme='dark'
        mode='horizontal'
        items={leftMenuItems}
        style={{
          background: 'transparent',
          flex: 1
        }}
      />

      {/* Menu phải */}
      {user ? (
        <Dropdown menu={userMenu} placement='bottomRight'>
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
      )}
    </AntHeader>
  );
}
