import { useEffect, useState } from 'react';
import { Card, Button, Avatar, Typography, Space, Divider } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CameraOutlined,
  FormOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import EditProfile from './InfoComponents/EditProfile';
import { uploadAvatar } from '../../redux/slices/userSlice';
import ChangePasswordModal from './InfoComponents/ChangePassword';
import RegisterProviderModal from './InfoComponents/RegisterProviderModal';
import { capitalizeName } from '../../utils/capitalize';
const { Title, Text } = Typography;

function Info({ user }) {
  const { container, title, avatar, iconCamera, info, text, btnBlock } = styles;
  const [preview, setPreview] = useState(user?.avatarUrl);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isRegisterProvider, setIsRegisterProvider] = useState(false);
  const dispatch = useDispatch();
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await dispatch(uploadAvatar(formData)).unwrap();
      console.log('Upload thành công:', res.avatarUrl);
      setPreview(`http://localhost:3000${res.avatarUrl}`);
      toast.success('Cập nhật avatar thành công!');
    } catch (err) {
      console.error('Upload thất bại:', err.response?.data || err.message);
      toast.error('Lỗi khi upload avatar');
    }
  };

  useEffect(() => {
    if (user?.avatarUrl) {
      setPreview(`http://localhost:3000${user?.avatarUrl}`);
    }
  }, [user?.avatarUrl]);
  return (
    <Card className={container}>
      <Title level={3} className={title}>
        Trang thông tin cá nhân
      </Title>
      {/* Avatar có thể đổi */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          size={120}
          src={preview}
          icon={<UserOutlined />}
          className={avatar}
        />
        {/* Overlay icon khi hover */}
        <label htmlFor='avatarUpload' className={iconCamera}>
          <CameraOutlined />
        </label>
        <input
          type='file'
          id='avatarUpload'
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleAvatarChange}
        />
      </div>
      {/* Tên */}
      <Title level={4} style={{ marginBottom: 12 }}>
        {capitalizeName(user?.fullName)}
      </Title>
      {/* Các thông tin với icon */}

      <Space direction='vertical' size={6} className={info}>
        <Divider style={{ borderColor: '#7cb305' }}>Thông tin chung</Divider>
        <Text className={text}>
          <MailOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          Email: {user?.email}
        </Text>
        <Text className={text}>
          <IdcardOutlined style={{ marginRight: 8, color: '#52c41a' }} />
          Vai trò: {user?.role === 'user' ? 'Người dùng' : 'Nhà cung cấp'}
        </Text>

        {user?.role === 'provider' && (
          <>
            <Divider style={{ borderColor: '#7cb305' }}>
              Thông tin nhà cung cấp
            </Divider>
            <Text className={text}>
              <PhoneOutlined style={{ marginRight: 8, color: '#faad14' }} />
              Số điện thoại: {user?.phone}
            </Text>
            <Text className={text}>
              <CreditCardOutlined
                style={{ marginRight: 8, color: '#13c2c2' }}
              />
              Số thẻ: {user?.cardNumber}
            </Text>
            <Text className={text}>
              <UserOutlined style={{ marginRight: 8, color: '#722ed1' }} />
              Chủ thẻ: {user?.cardHolderName}
            </Text>
            <Text className={text}>
              <BankOutlined style={{ marginRight: 8, color: '#eb2f96' }} />
              Ngân hàng: {user?.bankName}
            </Text>
            <Text className={text}>
              <WalletOutlined style={{ marginRight: 8, color: '#2f54eb' }} />
              Số tài khoản: {user?.bankAccount}
            </Text>
          </>
        )}
      </Space>
      <div className={btnBlock}>
        <Button
          type='primary'
          icon={<EditOutlined />}
          onClick={() => setIsEditOpen(true)}
        >
          Chỉnh sửa thông tin
        </Button>
        <Button
          color='danger'
          variant='solid'
          icon={<EditOutlined />}
          onClick={() => setIsChangePassword(true)}
        >
          Đổi mật khẩu
        </Button>
        {user?.role === 'user' && (
          <Button
            color='cyan'
            variant='solid'
            icon={<FormOutlined />}
            onClick={() => setIsRegisterProvider(true)}
          >
            Đăng ký nhà cung cấp
          </Button>
        )}
      </div>
      <EditProfile open={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <ChangePasswordModal
        open={isChangePassword}
        onClose={() => setIsChangePassword(false)}
      />
      <RegisterProviderModal
        open={isRegisterProvider}
        onClose={() => setIsRegisterProvider(false)}
      />
    </Card>
  );
}

export default Info;
