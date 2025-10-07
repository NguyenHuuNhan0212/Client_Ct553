import React from 'react';
import {
  Card,
  List,
  Input,
  Space,
  Button,
  Typography,
  Empty,
  Tooltip
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function PlaceList({ form, places, addActivity }) {
  return (
    <Card
      title='📍 Danh sách địa điểm'
      style={{
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        height: '100%'
      }}
    >
      <Input.Search
        placeholder='Tìm kiếm địa điểm...'
        allowClear
        size='large'
        style={{ marginBottom: 16 }}
      />

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={places}
        locale={{ emptyText: <Empty description='Không có địa điểm' /> }}
        renderItem={(place) => (
          <List.Item>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                border: '1px solid #f0f0f0',
                overflow: 'hidden',
                padding: 12
              }}
              bodyStyle={{ padding: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {place.images && place.images.length > 0 ? (
                  <img
                    src={`http://localhost:3000/${place.images[0]}`}
                    alt={place.name}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 8,
                      flexShrink: 0
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      background: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999'
                    }}
                  >
                    No Image
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <Tooltip
                    title={'Nhấn vào tên địa điểm để xem thông tin chi tiết'}
                  >
                    <Title level={5} style={{ margin: 0 }}>
                      <Link
                        to={
                          place.type !== 'hotel'
                            ? `/place/${place._id}`
                            : `/hotel/${place._id}`
                        }
                        onClick={(e) => e.stopPropagation()} // tránh click card cũng đi link
                      >
                        {place.name}
                      </Link>
                    </Title>
                  </Tooltip>
                  <Text
                    type='secondary'
                    style={{ display: 'block', margin: '4px 0 8px' }}
                  >
                    {place.address}
                  </Text>
                  <Text
                    type='secondary'
                    style={{ display: 'block', marginBottom: 8 }}
                  >
                    <EnvironmentOutlined />{' '}
                    {place.type === 'hotel'
                      ? 'Khách sạn, nhà nghỉ'
                      : place.type === 'cafe'
                      ? 'Quán cafe'
                      : place.type === 'restaurant'
                      ? 'Địa điểm ăn uống'
                      : 'Địa điểm du lịch'}
                  </Text>

                  <Space wrap>
                    {form.details.map((d, i) => (
                      <Button
                        key={i}
                        size='small'
                        type='primary'
                        onClick={() => addActivity(i, place)}
                      >
                        + Ngày {d.day}
                      </Button>
                    ))}
                  </Space>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}
