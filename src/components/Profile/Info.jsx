import { useEffect, useState } from 'react';
import { Card, Button, Avatar, Typography, Space, Upload } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  CameraOutlined
} from '@ant-design/icons';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { uploadAvatar } from '../../redux/slices/authSlice';
import EditProfile from './EditProfile/EditProfile';
const { Title, Text } = Typography;

function Info({ fullName, email, role, avatarUrl }) {
  const { containerInfo } = styles;
  const [preview, setPreview] = useState(avatarUrl);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
    if (avatarUrl) {
      setPreview(`http://localhost:3000${avatarUrl}`);
    }
  }, [avatarUrl]);
  return (
    <Card className={containerInfo}>
      {/* Avatar có thể đổi */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          size={120}
          src={preview}
          icon={<UserOutlined />}
          style={{
            border: '3px solid #f0f0f0',
            marginBottom: 16,
            cursor: 'pointer'
          }}
        />
        {/* Overlay icon khi hover */}
        <label
          htmlFor='avatarUpload'
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: '#00000080',
            borderRadius: '50%',
            padding: 6,
            cursor: 'pointer',
            color: 'white'
          }}
        >
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
        {fullName}
      </Title>

      {/* Các thông tin với icon */}
      <Space
        direction='vertical'
        size={6}
        style={{
          width: '100%',
          textAlign: 'center',
          maxWidth: 280,
          margin: '0 auto'
        }}
      >
        <Text>
          <MailOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          Email: {email}
        </Text>
        <Text>
          <IdcardOutlined style={{ marginRight: 8, color: '#52c41a' }} />
          Vai trò: {role}
        </Text>
      </Space>

      <div style={{ marginTop: 20 }}>
        <Button
          type='primary'
          icon={<EditOutlined />}
          onClick={() => setIsEditOpen(true)}
        >
          Chỉnh sửa
        </Button>
      </div>
      <EditProfile open={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </Card>
  );
}

export default Info;
