import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Button, Spin, Space } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';

const { Title, Text } = Typography;

// Hàm fetch dữ liệu mẫu (sau có thể thay bằng API thực)
const mockItineraries = [
  {
    _id: '1',
    title: 'Khám phá Đà Lạt 3 ngày 2 đêm',
    destination: 'Đà Lạt, Lâm Đồng',
    days: 3,
    participants: 2,
    status: 'popular',
    image:
      'https://images.unsplash.com/photo-1614331787193-cf9b4aaf6d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '2',
    title: 'Du lịch Hạ Long 2 ngày',
    destination: 'Quảng Ninh',
    days: 2,
    participants: 4,
    status: 'new',
    image:
      'https://images.unsplash.com/photo-1559717201-3233f0b89834?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '3',
    title: 'Khám phá Sài Gòn 1 ngày',
    destination: 'TP. Hồ Chí Minh',
    days: 1,
    participants: 1,
    status: 'recommended',
    image:
      'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=800&q=80'
  }
];

export default function ItineraryExplore() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setTemplates(mockItineraries);
      setLoading(false);
    }, 800);
  }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case 'new':
        return <Tag color='green'>Mới</Tag>;
      case 'popular':
        return <Tag color='blue'>Phổ biến</Tag>;
      case 'recommended':
        return <Tag color='purple'>Gợi ý</Tag>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '40px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🧳 Danh sách Lịch trình Mẫu
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size='large' />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {templates.map((item) => (
              <Col xs={24} sm={12} md={8} key={item._id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.title}
                      src={item.image}
                      style={{
                        height: 200,
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                      }}
                    />
                  }
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <Title level={4}>{item.title}</Title>
                    <Space size='small'>
                      <Text>{item.destination}</Text>
                    </Space>
                    <Space size='small'>
                      <Text>{item.days} ngày</Text>
                    </Space>
                    <Space size='small'>
                      <Text>{item.participants} người</Text>
                    </Space>
                    {getStatusTag(item.status)}
                    <Button
                      type='primary'
                      style={{ width: '100%' }}
                      onClick={() => alert(`Xem chi tiết: ${item.title}`)}
                    >
                      Xem chi tiết
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Footer />
      <Chatbot />
    </>
  );
}
