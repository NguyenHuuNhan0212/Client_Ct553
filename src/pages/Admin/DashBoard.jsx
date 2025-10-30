import React, { useEffect, useState } from 'react';
import {
  BarChartOutlined,
  DashboardOutlined,
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
  Badge,
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
import Dashboard from '../../components/AdminPage/Dashboard';
import VerifyPlace from '../../components/AdminPage/VerifyPlace';
import User from '../../components/AdminPage/User';
import Transaction from '../../components/AdminPage/Transaction';
import Stats from '../../components/AdminPage/Stats';
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
  const [totalUpgrade, setTotalUpgrade] = useState(0);
  const [totalAccountAwaitApprove, setTotalAccountAwaitApprove] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(defaultKey);

  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Bảng điều khiển'
    },
    {
      key: '2',
      icon: <IssuesCloseOutlined />,
      label: (
        <Space>
          Kiểm duyệt địa điểm
          <Badge count={totalAccountAwaitApprove} showZero color='#faad14' />
        </Space>
      )
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: (
        <Space>
          Quản lý người dùng
          <Badge count={totalUpgrade} showZero color='#faad14' />
        </Space>
      )
    },
    {
      key: '4',
      icon: <TransactionOutlined />,
      label: 'Giao dịch'
    },
    {
      key: '5',
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
        return (
          <Dashboard
            onSetUpgrade={setTotalUpgrade}
            totalUpgrade={totalUpgrade}
            onSetAwaitApprove={setTotalAccountAwaitApprove}
            totalAwaitApprove={totalAccountAwaitApprove}
          />
        );
      case '2':
        return (
          <VerifyPlace
            onSetAwaitApprove={setTotalAccountAwaitApprove}
            totalAwaitApprove={totalAccountAwaitApprove}
          />
        );
      case '3':
        return (
          <User onSetUpgrade={setTotalUpgrade} totalUpgrade={totalUpgrade} />
        );
      case '4':
        return <Transaction />;
      case '5':
        return <Stats />;
      default:
        return <Dashboard />;
    }
  };
  useEffect(() => {
    if (!token) {
      dispatch(logoutForAdmin());
      navigate('/admin/login');
    }
  }, [token, navigate, dispatch]);
  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        dispatch(logoutForAdmin());
        navigate('/admin/login');
      }
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <Layout style={{ minHeight: '92vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
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

            <Title level={1}>Trang quản trị</Title>
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
