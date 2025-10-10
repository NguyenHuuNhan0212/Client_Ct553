import { Card, Row, Col, Typography, Divider } from 'antd';
import {
  ArrowRightOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlaceType } from '../../redux/slices/placeSlice';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export default function ExploreCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(null);

  const categories = [
    {
      key: 'hotels',
      title: 'Khách sạn',
      type: 'hotel',
      description: 'Tận hưởng không gian lưu trú tiện nghi, sang trọng.',
      icon: <HomeOutlined style={{ fontSize: 40, color: '#1677ff' }} />,
      color: '#e6f4ff'
    },
    {
      key: 'cafe',
      title: 'Quán Cafe',
      type: 'cafe',
      description: 'Khám phá những quán cafe có không gian độc đáo và ấm cúng.',
      icon: <CoffeeOutlined style={{ fontSize: 40, color: '#fa8c16' }} />,
      color: '#fff7e6'
    },
    {
      key: 'restaurant',
      title: 'Nhà hàng',
      type: 'restaurant',
      description: 'Thưởng thức ẩm thực địa phương và món ăn đặc sản.',
      icon: <ShopOutlined style={{ fontSize: 40, color: '#52c41a' }} />,
      color: '#f6ffed'
    },
    {
      key: 'touristSpot',
      title: 'Địa điểm du lịch',
      type: 'touristSpot',
      description: 'Khám phá cảnh đẹp và trải nghiệm địa phương thú vị.',
      icon: <EnvironmentOutlined style={{ fontSize: 40, color: '#eb2f96' }} />,
      color: '#fff0f6'
    }
  ];

  return (
    <div>
      <Divider
        style={{
          fontSize: 30
        }}
      >
        Khám phá các địa điểm
      </Divider>

      <Row gutter={[32, 32]} justify='center'>
        {categories.map((item) => (
          <Col
            key={item.key}
            xs={24}
            sm={12}
            md={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              hoverable
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: 260,
                borderRadius: 16,
                textAlign: 'center',
                backgroundColor: item.color,
                transition: 'all 0.5s ease',
                boxShadow:
                  hovered === item.key
                    ? '0 8px 24px rgba(0,0,0,0.2)'
                    : '0 4px 12px rgba(0,0,0,0.1)',
                transform: hovered === item.key ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => {
                dispatch(setPlaceType({ type: item.type }));
                navigate(`/${item.key}`);
              }}
              styles={{ body: { padding: '30px 20px' } }}
            >
              <div style={{ marginBottom: 20 }}>{item.icon}</div>
              <Title level={4}>{item.title}</Title>
              <Paragraph
                style={{
                  color: '#555',
                  fontSize: 15,
                  lineHeight: 1.5,
                  minHeight: 50
                }}
              >
                {item.description}
              </Paragraph>

              <div
                style={{
                  marginTop: 10,
                  fontWeight: 500,
                  color: hovered === item.key ? '#0958d9' : '#1677ff',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                Khám phá ngay <ArrowRightOutlined />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
