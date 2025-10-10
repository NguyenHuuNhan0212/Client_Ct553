import { Carousel, Button, Typography } from 'antd';
import banner1 from '../../assets/images/wellcome.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner.png';
import styles from './style.module.css';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Banner() {
  const { container, heroOverlay, heroContent, title, des } = styles;

  const banners = [
    {
      id: 1,
      image: banner1
    },
    {
      id: 2,
      image: banner2
    },
    {
      id: 3,
      image: banner3
    }
  ];
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCreate, setIsHoveredCreate] = useState(false);
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative' }}>
      <Carousel autoplay autoplaySpeed={4000} speed={800} effect='fade'>
        {banners.map((item) => (
          <div key={item.id}>
            <div
              className={container}
              style={{
                backgroundImage: `url(${item.image})`,
                marginTop: 57
              }}
            >
              {/* Lớp phủ mờ nền */}
              <div className={heroOverlay}></div>

              {/* Nội dung hero */}
              <div className={heroContent}>
                <Title
                  level={1}
                  className={title}
                  style={{
                    color: '#fff',
                    fontSize: '42px',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                  }}
                >
                  Tạo Tour Du Lịch Của Riêng Bạn
                </Title>

                <Paragraph
                  className={des}
                  style={{
                    color: '#e0e0e0',
                    fontSize: '18px',
                    marginBottom: 0,
                    fontWeight: 600
                  }}
                >
                  Nền tảng kết nối những người yêu du lịch
                </Paragraph>

                <Paragraph
                  style={{
                    color: '#cfcfcf',
                    maxWidth: '600px',
                    margin: '8px auto 32px',
                    fontSize: '16px',
                    fontWeight: 400
                  }}
                >
                  Chia sẻ hành trình, kinh nghiệm từ đam mê du lịch của bạn
                </Paragraph>

                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    type='primary'
                    size='large'
                    onMouseEnter={() => setIsHoveredCreate(true)}
                    onMouseLeave={() => setIsHoveredCreate(false)}
                    style={{
                      transform: isHoveredCreate ? 'scale(1.1)' : 'scale(1)',
                      borderRadius: '50px',
                      fontWeight: '600',
                      padding: '0 30px',
                      transition: 'all 0.8s ease'
                    }}
                    onClick={() => navigate('/itinerary')}
                  >
                    <PlusCircleOutlined /> Tạo tour ngay
                  </Button>

                  <Button
                    size='large'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      backgroundColor: isHovered ? '#fff' : 'transparent',
                      color: isHovered ? '#1890ff' : '#fff',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      borderColor: '#fff',
                      borderRadius: '50px',
                      fontWeight: '600',
                      padding: '0 30px',
                      transition: 'all 0.8s ease'
                    }}
                  >
                    <SearchOutlined /> Khám phá tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
