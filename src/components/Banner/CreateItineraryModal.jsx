import React from 'react';
import { Modal, Card, Row, Col, Typography, Space } from 'antd';
import { EditOutlined, RobotOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CreateItineraryChoiceModal = ({ open, onCancel, onSelect }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
      styles={{
        body: {
          padding: '30px 24px',
          borderRadius: '12px',
          background: 'linear-gradient(to bottom right, #f9fafb, #ffffff)'
        }
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Chọn cách tạo lịch trình
        </Title>
        <Text type='secondary'>
          Hãy chọn phương thức phù hợp để bắt đầu chuyến đi của bạn
        </Text>
      </div>

      <Row gutter={[20, 20]} justify='center'>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => onSelect('manual')}
            style={{
              borderRadius: 12,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              height: '100%'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Space direction='vertical' align='center'>
              <EditOutlined
                style={{
                  fontSize: 36,
                  color: '#1677ff',
                  backgroundColor: '#e6f4ff',
                  borderRadius: '50%',
                  padding: 12
                }}
              />
              <Title level={5} style={{ marginTop: 8 }}>
                Tạo thủ công
              </Title>
              <Text type='secondary'>
                Tự tay thêm địa điểm, thời gian và hoạt động theo ý bạn.
              </Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card
            hoverable
            onClick={() => onSelect('ai')}
            style={{
              borderRadius: 12,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              height: '100%'
            }}
            styles={{ body: { padding: 24 } }}
          >
            <Space direction='vertical' align='center'>
              <RobotOutlined
                style={{
                  fontSize: 36,
                  color: '#eb2f96',
                  backgroundColor: '#fff0f6',
                  borderRadius: '50%',
                  padding: 12
                }}
              />
              <Title level={5} style={{ marginTop: 8 }}>
                Tạo với AI
              </Title>
              <Text type='secondary'>
                Để AI gợi ý lịch trình thông minh dựa trên sở thích của bạn.
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateItineraryChoiceModal;
