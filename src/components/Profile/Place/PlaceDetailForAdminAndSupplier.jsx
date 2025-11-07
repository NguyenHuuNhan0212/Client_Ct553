import React from 'react';
import {
  Modal,
  Descriptions,
  Tag,
  Carousel,
  Table,
  Divider,
  Button,
  Space,
  Typography
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { capitalizeName } from '../../../utils/capitalize';

const PlaceDetailModal = ({
  open,
  onClose,
  place,
  onApprove,
  isAdmin = false
}) => {
  if (!place) return null;

  const renderTypeTag = (type) => {
    const map = {
      restaurant: {
        color: 'orange',
        icon: <CoffeeOutlined />,
        text: 'Nhà hàng, quán ăn'
      },
      cafe: { color: 'cyan', icon: <CoffeeOutlined />, text: 'Quán cafe' },
      touristSpot: {
        color: 'purple',
        icon: <EnvironmentOutlined />,
        text: 'Địa điểm du lịch'
      },
      hotel: {
        color: 'green',
        icon: <HomeOutlined />,
        text: 'Khách sạn, nhà nghĩ'
      }
    };
    const { color, icon, text } = map[type] || {};
    return (
      <Tag color={color} icon={icon}>
        {text}
      </Tag>
    );
  };

  const columnsServices = [
    { title: 'Tên dịch vụ', dataIndex: 'name' },
    { title: 'Mô tả', dataIndex: 'description' },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      render: (p) => p?.toLocaleString()
    },
    { title: 'Loại', dataIndex: 'type' }
  ];

  const columnsRooms = [
    { title: 'Tên loại phòng', dataIndex: 'name' },
    { title: 'Sức chứa', dataIndex: 'capacity' },
    { title: 'Số lượng phòng', dataIndex: 'totalRooms' },
    {
      title: 'Giá/đêm (VNĐ)',
      dataIndex: 'pricePerNight',
      render: (v) => v?.toLocaleString()
    }
  ];
  const renderStatusApprove = () => {
    const { isApprove, createdAt, updatedAt } = place;
    if (!isApprove && createdAt === updatedAt) {
      return <Tag color='warning'>Đang chờ phê duyệt</Tag>;
    } else if (!isApprove && createdAt !== updatedAt) {
      return <Tag color='error'>Từ chối địa điểm</Tag>;
    } else if (isApprove) {
      return <Tag color='success'>Địa điểm được phê duyệt</Tag>;
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span style={{ fontWeight: 600 }}>{place.name}</span>}
      width={900}
      footer={
        <Space>
          {isAdmin &&
            !place.isApprove &&
            !place.deleted &&
            place.createdAt === place.updatedAt && (
              <Button
                type='primary'
                icon={<CheckCircleOutlined />}
                onClick={() => onApprove(place)}
              >
                Phê duyệt
              </Button>
            )}
          <Button onClick={onClose}>Đóng</Button>
        </Space>
      }
    >
      {place.images?.length > 0 && (
        <Carousel autoplay style={{ marginBottom: 20 }}>
          {place.images.map((img, i) => (
            <div key={i}>
              <img
                src={`http://localhost:3000/${img}`}
                alt={`Ảnh ${i}`}
                style={{
                  width: '100%',
                  height: 350,
                  objectFit: 'cover',
                  borderRadius: 8
                }}
              />
            </div>
          ))}
        </Carousel>
      )}
      <Descriptions bordered column={2}>
        {isAdmin && (
          <Descriptions.Item label='Chủ sở hữu' span={2}>
            <Typography.Text strong>
              {capitalizeName(place.userId?.fullName)}
            </Typography.Text>
          </Descriptions.Item>
        )}

        <Descriptions.Item label='Loại'>
          {renderTypeTag(place.type)}
        </Descriptions.Item>
        <Descriptions.Item label='Địa chỉ'>{place.address}</Descriptions.Item>
        <Descriptions.Item label='Trạng thái hoạt động'>
          {place.isActive ? (
            <Tag color='green' icon={<CheckCircleOutlined />}>
              Đang hoạt động
            </Tag>
          ) : (
            <Tag color='red' icon={<CloseCircleOutlined />}>
              Ngừng hoạt động
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Trạng thái phê duyệt'>
          {renderStatusApprove()}
        </Descriptions.Item>
        <Descriptions.Item label='Tổng dịch vụ'>
          {place.totalServices}
        </Descriptions.Item>
        <Descriptions.Item label='Lượt đặt'>
          {place.bookingCount}
        </Descriptions.Item>
        <Descriptions.Item label='Ngày đăng địa điểm' span={2}>
          {dayjs(place.createdAt).format('DD-MM-YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label='Mô tả' span={2}>
          {place.description ? (
            <div
              dangerouslySetInnerHTML={{ __html: place.description }}
              style={{
                lineHeight: 1.6,
                fontSize: 15,
                color: '#444',
                textAlign: 'justify'
              }}
            />
          ) : (
            'Không có mô tả'
          )}
        </Descriptions.Item>
      </Descriptions>

      {/* Dịch vụ */}
      {place.services?.length > 0 && (
        <>
          <Divider orientation='left'>
            <AppstoreOutlined /> Dịch vụ
          </Divider>
          <Table
            dataSource={place.services}
            columns={columnsServices}
            rowKey={(record) => record._id || record.name}
            pagination={false}
            size='small'
          />
        </>
      )}

      {/* Chi tiết khách sạn */}
      {place.type === 'hotel' && place.hotelDetail && (
        <>
          <Divider orientation='left'>
            <HomeOutlined /> Thông tin khách sạn
          </Divider>
          <Descriptions bordered column={2}>
            <Descriptions.Item label='Tiện ích'>
              {place.hotelDetail.facilities?.length > 0
                ? place.hotelDetail.facilities.join(', ')
                : 'Không có'}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation='left'>Loại phòng</Divider>
          <Table
            dataSource={place.hotelDetail.roomTypes}
            columns={columnsRooms}
            rowKey={(record) => record._id || record.name}
            pagination={false}
            size='small'
          />
        </>
      )}
    </Modal>
  );
};

export default PlaceDetailModal;
