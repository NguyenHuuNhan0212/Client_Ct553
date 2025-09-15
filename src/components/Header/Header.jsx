import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
const { Header: AntHeader } = Layout;

// Menu bên trái
const leftMenuItems = [
  { key: 'home', label: <Link to='/'>Trang chủ</Link> },
  { key: 'about', label: <Link to='/about'>Giới thiệu</Link> },
  { key: 'services', label: <Link to='/services'>Dịch vụ</Link> }
];

// Menu bên phải
const rightMenuItems = [
  { key: 'login', label: <Link to='/login'>Đăng nhập</Link> },
  { key: 'register', label: <Link to='/register'>Đăng ký</Link> }
];

export default function Header() {
  const { container } = styles;
  return (
    <AntHeader className={container}>
      {/* Logo */}
      <div
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          marginRight: 30
        }}
      >
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
