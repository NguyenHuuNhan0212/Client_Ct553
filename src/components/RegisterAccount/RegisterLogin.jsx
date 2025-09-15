import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../apis/authService';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import styles from './style.module.css';
const { Title } = Typography;

export default function RegisterLogin() {
  const { container } = styles;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      fullName: values.username,
      email: values.email,
      password: values.password
    };
    try {
      const res = await authApi.register(data);
      console.log(res);
      setIsLoading(false);
      toast.success('Đăng ký tài khoản thành công. Bạn có thể đăng nhập!');
      navigate('/login');
    } catch (err) {
      setIsLoading(false);
      toast.warning(err.response.data.message);
    }
  };

  return (
    <Card className={container} variant='borderless'>
      <Title
        level={3}
        style={{ textAlign: 'center', marginBottom: 25, fontWeight: 700 }}
      >
        Đăng ký tài khoản
      </Title>

      <Form
        form={form}
        name='register'
        onFinish={onFinish}
        layout='vertical'
        requiredMark='optional'
      >
        <Form.Item
          name='username'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Tên hiển thị
            </span>
          }
          rules={[
            { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            { min: 4, message: 'Tối thiểu 4 ký tự' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder='Tên hiển thị'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='email'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Email</span>
          }
          rules={[
            { type: 'email', message: 'Email không hợp lệ!' },
            { required: true, message: 'Vui lòng nhập email!' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' size='large' />
        </Form.Item>

        <Form.Item
          name='password'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Mật khẩu
            </span>
          }
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Mật khẩu'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='confirm'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Xác nhận mật khẩu
            </span>
          }
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Mật khẩu xác nhận không khớp!')
                );
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Xác nhận mật khẩu'
            size='large'
          />
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
            {isLoading ? <Loading /> : 'Đăng ký'}
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center', marginTop: 15 }}>
        Đã có tài khoản?{' '}
        <Link to={'/login'} style={{ color: '#2563eb', fontWeight: 500 }}>
          Đăng nhập ngay
        </Link>
      </p>
    </Card>
  );
}
