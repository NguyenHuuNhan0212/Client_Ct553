import React from 'react';
import {
  Card,
  Button,
  Input,
  InputNumber,
  Row,
  Col,
  Form,
  Typography
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;
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
        title={
          <div style={{ textAlign: 'center' }}>{`Loại phòng ${i + 1}`}</div>
        }
        extra={
          <Button
            danger
            size='small'
            icon={<DeleteOutlined />}
            onClick={() => removeRoomType(i)}
          />
        }
        style={{ marginBottom: 10, border: 'solid 1px blue' }}
      >
        <Text strong>Tên phòng</Text>
        <Input
          placeholder='Tên phòng'
          value={rt.name}
          onChange={(e) => updateRoomType(i, 'name', e.target.value)}
        />
        <Row gutter={8} style={{ marginTop: 8 }}>
          <Col span={8}>
            <Text strong>Sức chứa tối đa (số người/phòng)</Text>
            <InputNumber
              placeholder='Sức chứa'
              min={1}
              style={{ width: '100%' }}
              value={rt.capacity}
              onChange={(val) => updateRoomType(i, 'capacity', val)}
            />
          </Col>
          <Col span={8}>
            <Text strong>Số lượng phòng</Text>
            <InputNumber
              placeholder='Số lượng'
              min={1}
              style={{ width: '100%' }}
              value={rt.totalRooms}
              onChange={(val) => updateRoomType(i, 'totalRooms', val)}
            />
          </Col>
          <Col span={8}>
            <Text strong>Giá thuê VND (Giá/đêm)</Text>
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
