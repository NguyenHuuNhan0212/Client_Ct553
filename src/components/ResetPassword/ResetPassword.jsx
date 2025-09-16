import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import authApi from '../../apis/authService';

const { Title } = Typography;

export default function ResetPassword() {
  const { container } = styles;
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await authApi.resetPassword({
        password: values.password,
        token: token
      });
      console.log(res);
      toast.success('Đổi mật khẩu thành công!');
      navigate('/login');
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.error || 'Token không hợp lệ hoặc đã hết hạn'
      );
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
        Đặt lại mật khẩu
      </Title>

      <Form
        name='resetPassword'
        onFinish={onFinish}
        layout='vertical'
        requiredMark={false}
      >
        <Form.Item
          name='password'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Mật khẩu mới
            </span>
          }
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder='Nhập mật khẩu mới'
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          label={
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              Xác nhận mật khẩu
            </span>
          }
          dependencies={['password']}
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
            placeholder='Nhập lại mật khẩu'
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
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
