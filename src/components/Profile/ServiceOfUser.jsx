import { Card, Table, Tag, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPlaceOfUser } from '../../redux/slices/placeSlice';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
function ServiceProvide() {
  const dispatch = useDispatch();
  const { places: services, loading } = useSelector((state) => state.place);
  const navigate = useNavigate();
  const handleAddService = () => {
    navigate('/add-place');
  };
  useEffect(() => {
    dispatch(getAllPlaceOfUser()).unwrap();
  }, [dispatch]);

  return (
    <Card
      variant='borderless'
      title={
        <Title level={2} style={{ textAlign: 'center' }}>
          {'Dịch vụ của tôi'}
        </Title>
      }
      style={{ borderRadius: 10, padding: 20 }}
    >
      <Table
        dataSource={services}
        rowKey='_id'
        loading={loading}
        columns={[
          { title: 'Tên địa điểm', dataIndex: 'name' },
          { title: 'Loại địa điểm', dataIndex: 'type' },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
            render: (value) =>
              value ? (
                <Tag color='green'>Đang hoạt động</Tag>
              ) : (
                <Tag color='red'>Ngừng hoạt động</Tag>
              )
          },
          { title: 'Các dịch vụ', dataIndex: 'totalServices' }
        ]}
        pagination={{ pageSize: 5 }}
      />
      <Button
        type='primary'
        onClick={handleAddService}
        icon={<PlusOutlined />}
        style={{ marginTop: 20 }}
      >
        Thêm dịch vụ
      </Button>
    </Card>
  );
}

export default ServiceProvide;
