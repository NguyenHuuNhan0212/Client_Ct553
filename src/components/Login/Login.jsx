import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../apis/authService';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const { Title } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      email: values.email,
      password: values.password
    };
    try {
      const res = await authApi.login(data);
      console.log(res);
      setIsLoading(false);
      toast.success('Đăng nhập thành công');
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Card
      style={{
        width: 420,
        borderRadius: 20,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        padding: '30px 25px',
        background: 'rgba(255, 255, 255, 0.001)',
        backdropFilter: 'blur(10px)'
      }}
      variant='borderless' // thay cho bordered={false}
    >
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
        {/* Email */}
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { type: 'email', message: 'Email không hợp lệ!' },
            { required: true, message: 'Vui lòng nhập email!' }
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder='Nhập email'
            size='large'
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Nhập mật khẩu'
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
            {isLoading ? <Loading /> : 'Đăng nhập'}
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
