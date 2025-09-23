import React from 'react';
import { Card, Button, Input, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const ServiceTab = ({ services, addService, updateService, removeService }) => (
  <>
    {services.map((s, i) => (
      <Card
        key={i}
        size='small'
        title={`Dịch vụ ${i + 1}`}
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
        <Input
          placeholder='Tên dịch vụ'
          value={s.name}
          onChange={(e) => updateService(i, 'name', e.target.value)}
        />
        <Input
          placeholder='Mô tả'
          style={{ marginTop: 8 }}
          value={s.description}
          onChange={(e) => updateService(i, 'description', e.target.value)}
        />
        <InputNumber
          placeholder='Giá'
          min={0}
          style={{ width: '100%', marginTop: 8 }}
          value={s.price}
          onChange={(val) => updateService(i, 'price', val)}
        />
        <Input
          placeholder='Loại dịch vụ'
          style={{ marginTop: 8 }}
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
