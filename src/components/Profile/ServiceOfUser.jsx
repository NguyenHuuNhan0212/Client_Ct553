import { Card, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
function ServiceProvide() {
  const services = [
    {
      id: 1,
      name: 'Khách sạn ABC',
      price: '500k/đêm',
      status: 'Đang hoạt động'
    },
    {
      id: 2,
      name: 'Tour miền Tây',
      price: '1.2tr/người',
      status: 'Ngừng hoạt động'
    }
  ];
  return (
    <Card variant='borderless' style={{ borderRadius: 10, padding: 20 }}>
      <Table
        dataSource={services}
        rowKey='id'
        columns={[
          { title: 'Tên dịch vụ', dataIndex: 'name' },
          { title: 'Giá', dataIndex: 'price' },
          { title: 'Trạng thái', dataIndex: 'status' }
        ]}
        pagination={{ pageSize: 5 }}
      />
      <Button type='primary' icon={<PlusOutlined />} style={{ marginTop: 20 }}>
        Thêm dịch vụ
      </Button>
    </Card>
  );
}

export default ServiceProvide;
