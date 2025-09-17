import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux'; // giả sử bạn có slice này
import { changePassword } from '../../../redux/slices/userSlice';
import { toast } from 'react-toastify';

export default function ChangePasswordModal({ open, onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    await dispatch(
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })
    ).unwrap();
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Đổi mật khẩu'
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item
          label='Mật khẩu hiện tại'
          name='currentPassword'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }
          ]}
        >
          <Input.Password placeholder='Nhập mật khẩu hiện tại' />
        </Form.Item>

        <Form.Item
          label='Mật khẩu mới'
          name='newPassword'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
          ]}
        >
          <Input.Password placeholder='Nhập mật khẩu mới' />
        </Form.Item>

        <Form.Item
          label='Xác nhận mật khẩu mới'
          name='confirmPassword'
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }
          ]}
        >
          <Input.Password placeholder='Xác nhận mật khẩu mới' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
