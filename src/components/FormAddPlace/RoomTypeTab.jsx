import React from 'react';
import { Card, Button, Input, InputNumber, Row, Col, Form } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const RoomTypeTab = ({
  roomTypes,
  addRoomType,
  updateRoomType,
  removeRoomType
}) => (
  <>
    <Form.Item
      name='commissionPerCentage'
      label='Hoa hồng (%) cho quản trị'
      rules={[{ required: true }]}
    >
      <InputNumber style={{ width: '100%' }} min={0} max={100} />
    </Form.Item>

    {roomTypes.map((rt, i) => (
      <Card
        key={i}
        size='small'
        title={`Loại phòng ${i + 1}`}
        extra={
          <Button
            danger
            size='small'
            icon={<DeleteOutlined />}
            onClick={() => removeRoomType(i)}
          />
        }
        style={{ marginBottom: 10 }}
      >
        <Input
          placeholder='Tên phòng'
          value={rt.name}
          onChange={(e) => updateRoomType(i, 'name', e.target.value)}
        />
        <Row gutter={8} style={{ marginTop: 8 }}>
          <Col span={8}>
            <InputNumber
              placeholder='Sức chứa'
              min={1}
              style={{ width: '100%' }}
              value={rt.capacity}
              onChange={(val) => updateRoomType(i, 'capacity', val)}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              placeholder='Số lượng'
              min={1}
              style={{ width: '100%' }}
              value={rt.totalRooms}
              onChange={(val) => updateRoomType(i, 'totalRooms', val)}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              placeholder='Giá/đêm'
              min={0}
              style={{ width: '100%' }}
              value={rt.pricePerNight}
              onChange={(val) => updateRoomType(i, 'pricePerNight', val)}
            />
          </Col>
        </Row>
      </Card>
    ))}

    <Button type='dashed' block icon={<PlusOutlined />} onClick={addRoomType}>
      Thêm loại phòng
    </Button>
  </>
);

export default RoomTypeTab;
