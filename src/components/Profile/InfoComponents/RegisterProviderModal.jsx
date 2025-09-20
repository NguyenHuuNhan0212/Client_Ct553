import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { upgradeToProvider } from '../../../redux/slices/userSlice';

function RegisterProviderModal({ open, onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await dispatch(upgradeToProvider(values)).unwrap();
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Đăng ký tài khoản nhà cung cấp'
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        name='registerProvider'
        initialValues={{}}
      >
        <Form.Item
          name='phone'
          label='Số điện thoại'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: /^(0|\+84)(\d{9})$/,
              message:
                'Số điện thoại không hợp lệ (VD: 0349414282 hoặc +84349414282)'
            }
          ]}
        >
          <Input placeholder='Nhập số điện thoại' maxLength={12} />
        </Form.Item>
        <Form.Item
          name='cardHolderName'
          label='Tên chủ thẻ'
          rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ' }]}
        >
          <Input placeholder='VD: NGUYEN VAN A' />
        </Form.Item>

        <Form.Item
          name='cardNumber'
          label='Số thẻ'
          rules={[
            { required: true, message: 'Vui lòng nhập số thẻ' },
            { pattern: /^[0-9]{16}$/, message: 'Số thẻ phải gồm 16 chữ số' }
          ]}
        >
          <Input placeholder='Nhập số thẻ (16 chữ số)' maxLength={16} />
        </Form.Item>
        <Form.Item
          name='bankName'
          label='Tên ngân hàng'
          rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]}
        >
          <Input placeholder='VD: Vietcombank, BIDV, Techcombank...' />
        </Form.Item>

        <Form.Item
          name='bankAccount'
          label='Số tài khoản ngân hàng'
          rules={[
            { required: true, message: 'Vui lòng nhập số tài khoản' },
            { pattern: /^[0-9]{8,20}$/, message: 'Số tài khoản không hợp lệ' }
          ]}
        >
          <Input placeholder='Nhập số tài khoản' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' onClick={handleSubmit} block>
            Gửi yêu cầu đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RegisterProviderModal;
