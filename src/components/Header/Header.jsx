import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
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

// Menu bên phải
const rightMenuItems = [
  {
    key: 'login',
    label: (
      <Link to='/login' style={{ fontSize: '16px', fontWeight: '600' }}>
        Đăng nhập
      </Link>
    )
  },
  {
    key: 'register',
    label: (
      <Link to='/register' style={{ fontSize: '16px', fontWeight: '600' }}>
        Đăng ký
      </Link>
    )
  }
];

export default function Header() {
  const { container, logo } = styles;
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
          flex: 1 // chiếm không gian còn lại để đẩy menu phải sang bên phải
        }}
      />

      {/* Menu phải */}
      <Menu
        theme='dark'
        mode='horizontal'
        items={rightMenuItems}
        style={{
          background: 'transparent'
        }}
      />
    </AntHeader>
  );
}
