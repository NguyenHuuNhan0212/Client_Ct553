import React from 'react';
import { Form, Input, Button, Typography, Card, Spin } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

import styles from './style.module.css';
import { toast } from 'react-toastify';
import { getInfoUser } from '../../redux/slices/userSlice';

const { Title } = Typography;

export default function Login() {
  const { container } = styles;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onFinish = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      const userInfo = await dispatch(getInfoUser()).unwrap();
      if (userInfo?.role !== 'admin') {
        toast.success('Đăng nhập thành công');
        navigate('/');
      } else {
        toast.warning(
          'Đây là tài khoản quản trị. Hãy đăng nhập bằng tài khoản bình thường.'
        );
        navigate('/login');
      }
    } else if (login.rejected.match(result)) {
      console.log(result);
      toast.error(result?.payload?.message);
    }
  };

  return (
    <Card className={container} variant='borderless'>
      <Title
        level={3}
        style={{ textAlign: 'center', marginBottom: 25, fontWeight: 700 }}
      >
        Đăng nhập
      </Title>

      <Form
        form={form}
        name='login'
        onFinish={onFinish}
        layout='vertical'
        requiredMark={false}
      >
        <Form.Item
          name='identify'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Email hoặc Số điện thoại
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email! hoặc số điện thoại'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder='Nhập email hoặc số điện thoại'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='password'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Mật khẩu
            </span>
          }
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Nhập mật khẩu'
            size='large'
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Link
              to='/forgot-password'
              style={{ color: '#2563eb', fontWeight: 500 }}
            >
              Quên mật khẩu?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            style={{
              borderRadius: 10,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #3b82f6, #2563eb)'
            }}
          >
            {loading ? <Spin size='small' /> : 'Đăng nhập'}
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center', marginTop: 15 }}>
        Chưa có tài khoản?{' '}
        <Link to='/register' style={{ color: '#2563eb', fontWeight: 500 }}>
          Đăng ký ngay
        </Link>
      </p>
    </Card>
  );
}
