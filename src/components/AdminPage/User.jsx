import {
  Badge,
  Button,
  Card,
  Input,
  List,
  Select,
  Space,
  Typography
} from 'antd';
import { motion } from 'motion/react'; // eslint-disable-line
import { useEffect, useState } from 'react';
import userApi from '../../apis/userService';
import ListUser from './DashboardComponents/ListUser';
import { SearchOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
function User({ onSetUpgrade, totalUpgrade }) {
  const [users, setUsers] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [value, setValue] = useState('');
  const [isManage, setIsManage] = useState(true);

  const filteredUsers = users?.filter(
    (item) =>
      (!value || item.fullName.toLowerCase().includes(value.toLowerCase())) &&
      (!selectedType || item.role === selectedType)
  );

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
          }}
        >
          <Space>
            <Button
              color='cyan'
              variant='solid'
              onClick={() => handleClickAccountAwaitUpgrade()}
            >
              Tài khoản chờ nâng cấp
              <Badge count={totalUpgrade} showZero offset={[10, -25]} />
            </Button>
            <Button type='primary' onClick={() => handleShowAllUser()}>
              Tất cả người dùng
            </Button>
          </Space>

          <Space>
            <Text strong>Chọn vai trò người dùng: </Text>
            <Select
              placeholder='Chọn vai trò người dùng'
              // style={{ width: 200 }}
              allowClear
              value={selectedType || undefined}
              onChange={handleTypeChange}
              options={[
                { value: 'user', label: 'Người dùng' },
                { value: 'provider', label: 'Nhà cung cấp' }
              ]}
            />

            <Text strong>Nhập từ khóa: </Text>
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
        {isManage ? (
          <ListUser
            users={filteredUsers}
            setUsers={setUsers}
            isUserManagement={isManage}
          />
        ) : (
          <ListUser
            users={filteredUsers}
            setUsers={setUsers}
            onSetUpgrade={onSetUpgrade}
          />
        )}
      </Card>
    </motion.div>
  );
}

export default User;
