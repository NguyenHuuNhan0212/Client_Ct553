import React, { useEffect, useState } from 'react';
import {
  AreaChartOutlined,
  BarChartOutlined,
  DownOutlined,
  IssuesCloseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  TransactionOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography
} from 'antd';
import styles from './style.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutForAdmin } from '../../redux/slices/authSlice';
import { getInfoUser } from '../../redux/slices/userSlice';
const { Header, Sider, Content, Footer } = Layout;
const { Text, Title } = Typography;
const App = () => {
  const { logo, logoSmall, container, header, footer } = styles;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const defaultKey = params.get('tab') || '1';
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(defaultKey);
  const items = [
    {
      key: '1',
      icon: <AreaChartOutlined />,
      label: 'DashBoard'
    },
    {
      key: '2',
      icon: <IssuesCloseOutlined />,
      label: 'Kiểm duyệt địa điểm'
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Người dùng'
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: 'Vai trò & Phân quyền'
    },
    {
      key: '5',
      icon: <TransactionOutlined />,
      label: 'Giao dịch'
    },
    {
      key: '6',
      icon: <BarChartOutlined />,
      label: 'Thống kê'
    }
  ];
  const itemDropdowns = [
    {
      key: 'logout',
      label: (
        <Space
          onClick={() => {
            navigate('/admin/login');
            dispatch(logoutForAdmin());
          }}
        >
          <LogoutOutlined style={{ color: 'red' }} />
          Đăng xuất
        </Space>
      )
    }
  ];
  const handleSelectMenu = (e) => {
    setSelectedMenu(e.key);
    navigate(`/admin/dashboard?tab=${e.key}`);
  };
  const renderContent = (key) => {
    switch (key) {
      case '1':
        return 'Tab 1';
      case '2':
        return 'Tab 2';
      case '3':
        return 'Tab 3';
      case '4':
        return 'Tab 4';
      case '5':
        return 'Tab 5';
      case '6':
        return 'Tab 6';
      default:
        return 'Tab 1';
    }
  };
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);
  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);
  return (
    <>
      <Layout style={{ minHeight: '92vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={220}>
          <div
            className={collapsed ? logoSmall : logo}
            onClick={() => {
              setSelectedMenu('1');
              navigate('/admin/dashboard?tab=1');
            }}
          >
            Vigo Travel
          </div>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[selectedMenu]}
            onClick={handleSelectMenu}
            items={items}
          />
        </Sider>
        <Layout>
          <Header className={header}>
            <Tooltip title={collapsed ? 'Mở thanh menu' : 'Thu gọn thanh menu'}>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </Tooltip>

            <Title level={2}>Trang quản trị</Title>
            <Dropdown
              menu={{
                items: itemDropdowns
              }}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#2258b5ff' }}>AD</Avatar>
                <Text>{user?.email}</Text>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Header>
          <Content className={container}>{renderContent(selectedMenu)}</Content>
        </Layout>
      </Layout>
      <Footer className={footer}>
        © 2025 Vigo Travel. Mọi quyền được bảo lưu.
      </Footer>
    </>
  );
};
export default App;
