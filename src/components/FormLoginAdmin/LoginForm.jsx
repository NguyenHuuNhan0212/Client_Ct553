import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Card, Space, Flex } from 'antd';
import bgImage from '../../assets/images/background.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logoutForAdmin } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { getInfoUser } from '../../redux/slices/userSlice';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const handleLogin = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      const userInfo = await dispatch(getInfoUser()).unwrap();
      if (userInfo?.role !== 'admin') {
        toast.warning('Tài khoản không có quyền admin.');
        navigate('/admin/login');
        dispatch(logoutForAdmin());
      } else {
        toast.success('Đăng nhập tài khoản admin thành công');
        navigate('/admin/dashboard');
      }
    } else if (login.rejected.match(result)) {
      toast.error(result?.payload?.message || 'Đăng nhập thất bại');
      navigate('/admin/login');
    }
  };

  return (
    <Flex
      vertical
      justify='center'
      align='center'
      style={{
        height: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(5px)'
      }}
    >
      <Card
        variant='borderless'
        style={{
          width: 420,
          background: 'rgba(0, 0, 0, 0.55)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          borderRadius: 16,
          padding: 24
        }}
      >
        <Title level={3} style={{ color: '#fff', textAlign: 'center' }}>
          Đăng nhập cho admin
        </Title>

        <Form name='login' layout='vertical' onFinish={handleLogin}>
          <Form.Item
            name='identify'
            label={<Text style={{ color: '#fff' }}>Email</Text>}
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder='Nhập email quản trị'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label={<Text style={{ color: '#fff' }}>Mật khẩu</Text>}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Nhập mật khẩu'
              size='large'
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              loading={loading}
            >
              Đăng nhập quản trị
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default AdminLogin;
