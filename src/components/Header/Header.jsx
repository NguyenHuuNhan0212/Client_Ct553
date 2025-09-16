import { Layout, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const { Header: AntHeader } = Layout;

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

export default function Header() {
  const { container, logo } = styles;
  const navigate = useNavigate();
  // Giả sử bạn có state user lấy từ localStorage hoặc context
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link to='/profile'>Thông tin cá nhân</Link>
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: <span onClick={handleLogout}>Đăng xuất</span>
      }
    ]
  };

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
          <span style={{ color: 'white', cursor: 'pointer', fontWeight: 600 }}>
            {user.fullName} <DownOutlined />
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
