import React, { useState, useMemo } from 'react';
import {
  Card,
  List,
  Input,
  Space,
  Button,
  Typography,
  Empty,
  Tooltip,
  Select,
  Row,
  Col,
  Tag
} from 'antd';
import {
  EnvironmentOutlined,
  CoffeeOutlined,
  HomeOutlined,
  ShopOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

export default function PlaceList({ form, places = [], addActivity }) {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchName = place.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      const matchType = filterType === 'all' ? true : place.type === filterType;
      return matchName && matchType;
    });
  }, [places, searchText, filterType]);

  const typeMeta = {
    hotel: {
      label: 'Khách sạn / Nhà nghỉ',
      icon: <HomeOutlined />,
      color: 'blue'
    },
    cafe: { label: 'Quán cafe', icon: <CoffeeOutlined />, color: 'orange' },
    restaurant: { label: 'Ăn uống', icon: <ShopOutlined />, color: 'green' },
    touristSpot: { label: 'Du lịch', icon: <BankOutlined />, color: 'purple' }
  };

  return (
    <Card
      title='📍 Danh sách địa điểm'
      style={{
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        height: '100%',
        padding: 12
      }}
    >
      {/* 🔍 Thanh tìm kiếm và lọc */}
      <Card
        size='small'
        style={{
          borderRadius: 12,
          marginBottom: 20,
          background: '#fafafa',
          border: '1px solid #eee'
        }}
      >
        <Space style={{ width: '100%' }} size='middle' align='center'>
          <Select
            size='large'
            value={filterType}
            style={{ width: 240 }}
            onChange={(value) => setFilterType(value)}
          >
            <Option value='all'>Tất cả loại</Option>
            <Option value='hotel'>🏨 Khách sạn / Nhà nghỉ</Option>
            <Option value='cafe'>☕ Quán cafe</Option>
            <Option value='restaurant'>🍴 Địa điểm ăn uống</Option>
            <Option value='touristSpot'>🏝️ Địa điểm du lịch</Option>
          </Select>
          <Input.Search
            placeholder='Tìm kiếm địa điểm...'
            allowClear
            size='large'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 1 }}
          />
        </Space>
      </Card>

      {/* 📋 Danh sách dạng lưới */}
      {filteredPlaces.length === 0 ? (
        <Empty description='Không có địa điểm phù hợp' />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredPlaces.map((place) => (
            <Col xs={24} sm={12} key={place._id}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                styles={{ body: { padding: 0 } }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.02)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.0)')
                }
              >
                <div style={{ position: 'relative' }}>
                  {place.images && place.images.length > 0 ? (
                    <img
                      src={`http://localhost:3000/${place.images[0]}`}
                      alt={place.name}
                      style={{
                        width: '100%',
                        height: 160,
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: 160,
                        background: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999'
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <Tag
                    color={typeMeta[place.type]?.color || 'default'}
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      borderRadius: 6,
                      fontWeight: 500
                    }}
                  >
                    {typeMeta[place.type]?.icon} {typeMeta[place.type]?.label}
                  </Tag>
                </div>

                <div style={{ padding: 16 }}>
                  <Tooltip title='Nhấn vào để xem chi tiết'>
                    <Title
                      level={5}
                      style={{
                        marginBottom: 8,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      <Link
                        to={
                          place.type !== 'hotel'
                            ? `/place/${place._id}`
                            : `/hotel/${place._id}`
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        {place.name}
                      </Link>
                    </Title>
                  </Tooltip>

                  <Text
                    type='secondary'
                    style={{
                      display: 'block',
                      marginBottom: 8
                    }}
                  >
                    <EnvironmentOutlined /> {place.address}
                  </Text>

                  <Space wrap>
                    {form.details.map((d, i) => (
                      <Tooltip title={`Thêm địa điểm vào ngày ${d.day}`}>
                        <Button
                          key={i}
                          size='small'
                          type='primary'
                          onClick={() => addActivity(i, place)}
                        >
                          + Ngày {d.day}
                        </Button>
                      </Tooltip>
                    ))}
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
}
