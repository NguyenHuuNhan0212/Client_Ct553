import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import authApi from '../../apis/authService';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

const { Title } = Typography;

export default function ForgotPassword() {
  const { container } = styles;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await authApi.forgotPassword(values);
      console.log(res);
      toast.success(
        'Yêu cầu đặt lại mật khẩu thành công. Hãy kiểm tra email của bạn!'
      );
      navigate('/login');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={container} variant='borderless'>
      <Title
        level={3}
        style={{ textAlign: 'center', marginBottom: 25, fontWeight: 700 }}
      >
        Quên mật khẩu
      </Title>

      <Form
        name='forgotPassword'
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
            placeholder='Nhập email đã đăng ký'
            size='large'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            loading={loading}
            style={{
              borderRadius: 10,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #3b82f6, #2563eb)'
            }}
          >
            Gửi link đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
