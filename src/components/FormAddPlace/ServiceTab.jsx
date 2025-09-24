import React from 'react';
import { Card, Button, Input, InputNumber, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;
const ServiceTab = ({ services, addService, updateService, removeService }) => (
  <>
    {services.map((s, i) => (
      <Card
        key={i}
        size='small'
        title={<div style={{ textAlign: 'center' }}>{`Dịch vụ ${i + 1}`}</div>}
        extra={
          <Button
            danger
            size='small'
            icon={<DeleteOutlined />}
            onClick={() => removeService(i)}
          />
        }
        style={{ marginBottom: 10 }}
      >
        <Text strong>Tên dịch vụ</Text>
        <Input
          placeholder='Tên dịch vụ'
          value={s.name}
          onChange={(e) => updateService(i, 'name', e.target.value)}
          style={{ marginBottom: 10, marginTop: 8 }}
        />
        <Text strong>Mô tả dịch vụ</Text>
        <Input
          placeholder='Mô tả'
          style={{ marginBottom: 10, marginTop: 8 }}
          value={s.description}
          onChange={(e) => updateService(i, 'description', e.target.value)}
        />
        <Text strong>Giá dịch vụ</Text>
        <InputNumber
          placeholder='Giá dịch vụ'
          min={0}
          style={{ width: '100%', marginBottom: 10, marginTop: 8 }}
          value={s.price}
          onChange={(val) => updateService(i, 'price', val)}
        />
        <Text strong>Loại dịch vụ</Text>
        <Input
          placeholder='Loại dịch vụ'
          style={{ marginBottom: 10, marginTop: 8 }}
          value={s.type}
          onChange={(e) => updateService(i, 'type', e.target.value)}
        />
      </Card>
    ))}
    <Button type='dashed' block icon={<PlusOutlined />} onClick={addService}>
      Thêm dịch vụ
    </Button>
  </>
);

export default ServiceTab;
