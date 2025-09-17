import React from 'react';
import { Card, Typography, Timeline, Tag } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function ItineraryComponent({ itinerary }) {
  if (!itinerary) return null;

  return (
    <div style={{ padding: '20px' }}>
      {/* Thông tin chung */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Title level={2} style={{ marginBottom: 0 }}>
          {itinerary.title}
        </Title>
        <Paragraph type='secondary' style={{ fontSize: 16 }}>
          <CalendarOutlined /> {itinerary.numDays} ngày
        </Paragraph>
      </div>

      {/* Timeline chi tiết */}
      <Timeline mode='left' style={{ marginTop: 20 }}>
        {itinerary.details?.map((detail, index) => (
          <Timeline.Item
            key={detail.detailId || index}
            label={<b>Ngày {detail.visitDay}</b>}
            dot={
              <EnvironmentOutlined style={{ fontSize: 18, color: '#1890ff' }} />
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {detail.places?.map((place, idx) => (
                <Card
                  key={idx}
                  hoverable
                  cover={
                    place.imageUrl && (
                      <img
                        alt={place.name}
                        src={place.imageUrl}
                        style={{
                          height: 200,
                          objectFit: 'cover',
                          borderTopLeftRadius: '12px',
                          borderTopRightRadius: '12px'
                        }}
                      />
                    )
                  }
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <Title level={5} style={{ marginBottom: 6 }}>
                    {place.name}{' '}
                    {place.type && (
                      <Tag color='blue' style={{ marginLeft: 8 }}>
                        {place.type}
                      </Tag>
                    )}
                  </Title>
                  <Paragraph style={{ margin: 0 }}>
                    {place.description}
                  </Paragraph>
                </Card>
              ))}
            </div>

            {detail.note && (
              <Paragraph italic style={{ margin: '12px 0 0 8px' }}>
                Ghi chú: {detail.note}
              </Paragraph>
            )}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
}
