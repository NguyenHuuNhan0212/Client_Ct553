import React from 'react';
import {
  Card,
  Tabs,
  Descriptions,
  Button,
  Table,
  Typography,
  Empty
} from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || null;

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <Card style={{ textAlign: 'center', padding: '40px 30px' }}>
          <Title level={3}>Bạn chưa đăng nhập</Title>
          <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>
        </Card>
      </div>
    );
  }

  // Giả lập dữ liệu
  const bookings = [
    { id: 1, service: 'Khách sạn ABC', status: 'Đã xác nhận', price: 1500000 },
    { id: 2, service: 'Khách sạn 1', status: 'Đã xác nhận', price: 1500000 },
    { id: 3, service: 'Khách sạn 2', status: 'Đã xác nhận', price: 1500000 },
    { id: 4, service: 'Khách sạn 3', status: 'Đã xác nhận', price: 1500000 },
    { id: 5, service: 'Khách sạn 5', status: 'Đã xác nhận', price: 1500000 },
    { id: 6, service: 'Khách sạn 6', status: 'Đã xác nhận', price: 1500000 },
    { id: 7, service: 'Tour Cần Thơ', status: 'Chờ xác nhận', price: 1200000 }
  ];

  const services = [
    {
      id: 1,
      name: 'Khách sạn ABC',
      price: '500k/đêm',
      status: 'Đang hoạt động'
    },
    {
      id: 2,
      name: 'Tour miền Tây',
      price: '1.2tr/người',
      status: 'Ngừng hoạt động'
    }
  ];

  const revenueStats = [
    { month: '01/2025', revenue: 5000000 },
    { month: '02/2025', revenue: 8200000 }
  ];

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: (
        <Card
          bordered={false}
          style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <Descriptions title='Thông tin của bạn' column={1} bordered>
            <Descriptions.Item label='Họ tên'>
              {user.fullName}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
            <Descriptions.Item label='Vai trò'>{user.role}</Descriptions.Item>
          </Descriptions>
          <Button
            type='primary'
            icon={<EditOutlined />}
            style={{ marginTop: 20 }}
          >
            Chỉnh sửa
          </Button>
        </Card>
      )
    },
    {
      key: '2',
      label: 'Lịch trình',
      children: (
        <Card
          bordered={false}
          style={{ borderRadius: 10, textAlign: 'center', padding: 60 }}
        >
          <Empty description='Bạn chưa có lịch trình nào.' />
          <Button
            type='primary'
            icon={<PlusOutlined />}
            style={{ marginTop: 20 }}
          >
            Tạo lịch trình mới
          </Button>
        </Card>
      )
    },
    {
      key: '3',
      label: 'Đơn đặt dịch vụ',
      children: (
        <Card bordered={false} style={{ borderRadius: 10, padding: 20 }}>
          <Table
            dataSource={bookings}
            rowKey='id'
            columns={[
              { title: 'Dịch vụ', dataIndex: 'service' },
              { title: 'Trạng thái', dataIndex: 'status' },
              {
                title: 'Giá (VNĐ)',
                dataIndex: 'price',
                render: (val) => val.toLocaleString()
              }
            ]}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      )
    },
    {
      key: '4',
      label: 'Thanh toán',
      children: (
        <Card
          bordered={false}
          style={{ borderRadius: 10, padding: 60, textAlign: 'center' }}
        >
          <Empty description='Lịch sử thanh toán sẽ hiển thị ở đây.' />
        </Card>
      )
    }
  ];

  // Nếu user là provider thì thêm 2 tab nữa
  if (user.role === 'provider') {
    tabItems.push(
      {
        key: '5',
        label: 'Dịch vụ của tôi',
        children: (
          <Card bordered={false} style={{ borderRadius: 10, padding: 20 }}>
            <Table
              dataSource={services}
              rowKey='id'
              columns={[
                { title: 'Tên dịch vụ', dataIndex: 'name' },
                { title: 'Giá', dataIndex: 'price' },
                { title: 'Trạng thái', dataIndex: 'status' }
              ]}
              pagination={{ pageSize: 5 }}
            />
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ marginTop: 20 }}
            >
              Thêm dịch vụ
            </Button>
          </Card>
        )
      },
      {
        key: '6',
        label: 'Thống kê dịch vụ',
        children: (
          <Card bordered={false} style={{ borderRadius: 10, padding: 20 }}>
            <Table
              dataSource={revenueStats}
              rowKey='month'
              columns={[
                { title: 'Tháng', dataIndex: 'month' },
                {
                  title: 'Doanh thu (VNĐ)',
                  dataIndex: 'revenue',
                  render: (val) => val.toLocaleString()
                }
              ]}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        )
      }
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '30px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
        Trang thông tin cá nhân
      </Title>
      <Tabs defaultActiveKey='1' items={tabItems} type='card' />
    </div>
  );
}
