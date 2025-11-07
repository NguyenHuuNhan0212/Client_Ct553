import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  Row,
  Select,
  Space,
  Typography
} from 'antd';
import { motion } from 'motion/react'; // eslint-disable-line
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
import ListUser from './DashboardComponents/ListUser';
import { SearchOutlined } from '@ant-design/icons';
import PieChart from './DashboardComponents/Chart/PieChart';
const { Title, Text } = Typography;
function User({ onSetUpgrade, totalUpgrade }) {
  const [users, setUsers] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [value, setValue] = useState('');
  const [isManage, setIsManage] = useState(true);
  const [title, setTitle] = useState('Tất cả người dùng');
  const [totalUser, setTotalUser] = useState(0);
  const [totalProvider, setTotalProvider] = useState(0);
  const [isUpdateTotalProvider, setIsUpdateTotalProvider] = useState(false);
  const filteredUsers = users?.filter(
    (item) =>
      (!value || item.fullName.toLowerCase().includes(value.toLowerCase())) &&
      (!selectedType || item.role === selectedType)
  );

  const dataPieChart = [
    {
      name: 'Người dùng',
      value: totalUser
    },
    {
      name: 'Nhà cung cấp',
      value: totalProvider
    }
  ];
  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
  };
  const handleClickAccountAwaitUpgrade = async () => {
    setSelectedType('');
    setValue('');
    setTitle('Người dùng chờ phê duyệt đăng ký tài khoản nhà cung cấp');
    try {
      const res = await userApi.getQuantityAccountAwaitConfirm();
      setUsers(res.usersUpgrade);
      onSetUpgrade(res.total);
      setIsManage(false);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách người dùng chờ nâng cấp');
    }
  };

  const handleShowAllUser = async () => {
    setSelectedType('');
    setValue('');
    setTitle('Tất cả người dùng');
    try {
      const res = await userApi.getAllUser();
      setUsers(res);
      setIsManage(true);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách người dùng');
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userApi.getAllUser();
        setUsers(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy danh sách người dùng');
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await userApi.getStatsUser();
        if (resUser?.userGroupByRole && resUser?.userGroupByRole?.length > 0) {
          if (resUser.userGroupByRole[0]._id === 'user') {
            setTotalUser(resUser.userGroupByRole[0]?.totalUser || 0);
            setTotalProvider(resUser.userGroupByRole[1]?.totalUser || 0);
          } else {
            setTotalProvider(resUser.userGroupByRole[0]?.totalUser || 0);
            setTotalUser(resUser.userGroupByRole[1]?.totalUser || 0);
          }
        }
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy stats user');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (isUpdateTotalProvider) {
      const fetchData = async () => {
        try {
          const resUser = await userApi.getStatsUser();
          if (
            resUser?.userGroupByRole &&
            resUser?.userGroupByRole?.length > 0
          ) {
            if (resUser.userGroupByRole[0]._id === 'user') {
              setTotalUser(resUser.userGroupByRole[0]?.totalUser || 0);
              setTotalProvider(resUser.userGroupByRole[1]?.totalUser || 0);
            } else {
              setTotalProvider(resUser.userGroupByRole[0]?.totalUser || 0);
              setTotalUser(resUser.userGroupByRole[1]?.totalUser || 0);
            }
          }
          setIsUpdateTotalProvider(false);
        } catch (err) {
          console.log(err.message || 'Lỗi khi lấy stats user');
        }
      };
      fetchData();
    }
  }, [isUpdateTotalProvider]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginTop: 5 }}>
          Quản lý người dùng
        </Title>

        <Row gutter={[10, 10]}>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}>
              <PieChart
                data={dataPieChart}
                title={'Tỷ lệ người dùng và nhà cung cấp'}
              />
            </div>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}></div>
          </Col>
        </Row>
        <Divider />
        <Title level={3}>Danh sách người dùng</Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
          }}
        >
          <Space>
            <Button type='primary' onClick={() => handleShowAllUser()}>
              Tất cả người dùng
            </Button>
            <Button
              color='cyan'
              variant='outlined'
              onClick={() => handleClickAccountAwaitUpgrade()}
            >
              Tài khoản chờ nâng cấp
              <Badge count={totalUpgrade} showZero offset={[10, -25]} />
            </Button>
          </Space>

          <Space>
            <Select
              placeholder='Chọn vai trò người dùng'
              allowClear
              value={selectedType || undefined}
              onChange={handleTypeChange}
              options={[
                { value: 'user', label: 'Người dùng' },
                { value: 'provider', label: 'Nhà cung cấp' }
              ]}
            />
            <Input
              prefix={<SearchOutlined />}
              placeholder={'Nhập tên người dùng...'}
              value={value}
              onChange={handleSearchChange}
              style={{ width: 300 }}
              allowClear
            />
          </Space>
        </div>
        <Text type='secondary'>{title}</Text>
        {isManage ? (
          <>
            <ListUser
              users={filteredUsers}
              setUsers={setUsers}
              isUserManagement={isManage}
            />
          </>
        ) : (
          <ListUser
            users={filteredUsers}
            setUsers={setUsers}
            onSetUpgrade={onSetUpgrade}
            onSetTotalProvider={(value) => setIsUpdateTotalProvider(value)}
          />
        )}
      </Card>
    </motion.div>
  );
}

export default User;
