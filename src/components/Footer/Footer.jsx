import { Layout, Row, Col, Typography, Space } from 'antd';
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react'; //eslint-disable-line
const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

export default function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, #12479dff 0%, #5890daff 100%)',
    color: '#fff',
    padding: '50px 80px 20px',
    textAlign: 'left',
    fontFamily: "'Segoe UI', sans-serif"
  };

  const linkStyle = {
    color: '#d9e6ff',
    textDecoration: 'none',
    display: 'block',
    margin: '6px 0',
    transition: 'color 0.3s'
  };

  const socialIconStyle = {
    fontSize: 20,
    color: '#fff',
    marginRight: 16,
    transition: 'color 0.3s'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <AntFooter style={footerStyle}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>
              Vigo Travel
            </div>
            <Text style={{ color: '#d9e6ff', fontSize: 14, lineHeight: 1.6 }}>
              Nền tảng kết nối du lịch hiện đại — nơi bạn khám phá, đặt dịch vụ
              và trải nghiệm những chuyến đi tuyệt vời.
            </Text>
          </Col>

          {/* Cột 2 - Liên kết nhanh */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title
              level={5}
              style={{ color: '#fff', textTransform: 'uppercase' }}
            >
              Liên kết nhanh
            </Title>
            <Link
              to={'/'}
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#d9e6ff')}
            >
              Trang chủ
            </Link>
            <Link
              to={'/hotels'}
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#d9e6ff')}
            >
              Khách sạn
            </Link>
          </Col>

          {/* Cột 3 - Liên hệ */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title
              level={5}
              style={{ color: '#fff', textTransform: 'uppercase' }}
            >
              Liên hệ
            </Title>
            <Space direction='vertical' size='small'>
              <Text style={{ color: '#fff' }}>
                <EnvironmentOutlined /> 715/25, Đường 3/2, Phường An Bình, Cần
                Thơ
              </Text>
              <Text style={{ color: '#fff' }}>
                <PhoneOutlined /> 0349414282
              </Text>
              <Text style={{ color: '#fff' }}>
                <MailOutlined /> support@vigotravel.com
              </Text>
            </Space>
          </Col>

          {/* Cột 4 - Mạng xã hội */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title
              level={5}
              style={{ color: '#fff', textTransform: 'uppercase' }}
            >
              Theo dõi chúng tôi
            </Title>
            <Space>
              <a href='#'>
                <FacebookFilled style={socialIconStyle} />
              </a>
              <a href='#'>
                <InstagramFilled style={socialIconStyle} />
              </a>
              <a href='#'>
                <TwitterCircleFilled style={socialIconStyle} />
              </a>
              <a href='#'>
                <YoutubeFilled style={socialIconStyle} />
              </a>
            </Space>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            marginTop: 40,
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 13,
            color: '#b5cfff'
          }}
        >
          © 2025 Travel Platform. Mọi quyền được bảo lưu.
        </div>
      </AntFooter>
    </motion.div>
  );
}
