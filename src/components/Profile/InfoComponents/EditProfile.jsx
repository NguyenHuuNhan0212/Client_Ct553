import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getInfoUser, updateProfile } from '../../../redux/slices/userSlice';
//import { useEffect } from 'react';

function EditProfile({ open, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [form] = Form.useForm();

  //   useEffect(() => {
  //     if (user && form) {
  //       form.resetFields();
  //       form.setFieldsValue({
  //         fullName: user.fullName,
  //         email: user.email
  //       });
  //     }
  //   }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await dispatch(updateProfile(values));
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Cập nhật thông tin thành công!');
        dispatch(getInfoUser()); // refresh lại user từ backend
        onClose();
      } else {
        toast.error('Cập nhật thất bại!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra!');
    }
  };

  return (
    <Modal
      title='Chỉnh sửa thông tin'
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText='Lưu'
      cancelText='Hủy'
      destroyOnHidden
      afterOpenChange={(visible) => {
        if (visible && user) {
          form.setFieldsValue({
            fullName: user.fullName,
            email: user.email
          });
        }
      }}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Họ và tên'
          name='fullName'
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditProfile;
