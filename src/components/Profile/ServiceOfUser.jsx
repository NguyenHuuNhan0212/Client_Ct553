import { Card, Table, Tag, Button, Typography, Space } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
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

  const handleClickSeeDetail = (value) => {
    navigate(`/place/${value._id}`);
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
          { title: 'Tên địa điểm', align: 'center', dataIndex: 'name' },
          { title: 'Loại địa điểm', align: 'center', dataIndex: 'type' },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
            align: 'center',
            render: (value) =>
              value ? (
                <Tag color='green'>Đang hoạt động</Tag>
              ) : (
                <Tag color='red'>Ngừng hoạt động</Tag>
              )
          },
          {
            title: 'Số lượng dịch vụ',
            align: 'center',
            dataIndex: 'totalServices'
          },
          {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Space size='large' style={{ fontSize: 20 }}>
                <EyeOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClickSeeDetail(record)}
                />
                <EditOutlined style={{ cursor: 'pointer' }} />
              </Space>
            )
          }
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
