import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import Loading from '../Loading/Loading';
import styles from './style.module.css';

const { Title } = Typography;

export default function Login() {
  const { container } = styles;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  const onFinish = async (values) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate('/');
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
          name='email'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Email</span>
          }
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
            {loading ? <Loading /> : 'Đăng nhập'}
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
