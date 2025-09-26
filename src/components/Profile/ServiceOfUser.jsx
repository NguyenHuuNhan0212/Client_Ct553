import { Card, Table, Tag, Button, Typography, Space, Modal } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPlaceOfUser } from '../../redux/slices/placeSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import placeApi from '../../apis/placeService';
import FormUpdatePlace from '../FormAddPlace/FormUpdatePlace';
const { Title } = Typography;
function ServiceProvide() {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const dispatch = useDispatch();
  const { placesOffUser: services, loading } = useSelector(
    (state) => state.place
  );
  const navigate = useNavigate();

  const handleAddService = () => {
    navigate('/add-place');
  };
  const handleEdit = (record) => {
    setEditingPlace(record);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setEditingPlace(null);
    setOpenEdit(false);
  };
  const handleClickSeeDetail = (record) => {
    navigate(`/place/${record._id}`);
  };

  const showModal = (record) => {
    setSelectedPlace(record);
    setOpen(true);
  };

  const handleRemovePlace = async () => {
    if (!selectedPlace) return;
    try {
      const res = await placeApi.deletePlace(selectedPlace._id); //eslint-disable-line
      await dispatch(getAllPlaceOfUser()).unwrap();
      setOpen(false);
      toast.success(`Đã xóa "${selectedPlace.name}" thành công.`);
    } catch (err) {
      toast.error(err.response?.data);
    }
  };
  const handleToggleStatus = async (record) => {
    try {
      await placeApi.updateStatusActive(record._id);
      await dispatch(getAllPlaceOfUser()).unwrap();
      toast.success(
        `Cập nhật trạng thái hoạt động của ${record.name} thành công`
      );
    } catch (err) {
      toast.error(err.response?.data);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setSelectedPlace(null);
  };

  useEffect(() => {
    dispatch(getAllPlaceOfUser()).unwrap();
  }, [dispatch]);

  return (
    <Card
      variant='borderless'
      title={
        <Title level={2} style={{ textAlign: 'center' }}>
          Dịch vụ của tôi
        </Title>
      }
      style={{ borderRadius: 10, padding: 20 }}
    >
      <Table
        dataSource={services}
        rowKey='_id'
        loading={loading}
        columns={[
          {
            title: 'STT',
            dataIndex: 'index',
            align: 'center',
            render: (_, __, index) => index + 1
          },
          { title: 'Tên địa điểm', align: 'center', dataIndex: 'name' },
          { title: 'Loại địa điểm', align: 'center', dataIndex: 'type' },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
            align: 'center',
            render: (value, record) => (
              <Space>
                <Tag color={value ? 'green' : 'red'}>
                  {value ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                </Tag>
                <Button
                  type={value ? 'default' : 'primary'}
                  color={value ? 'danger' : ''}
                  variant={value ? 'solid' : ''}
                  size='small'
                  onClick={() => handleToggleStatus(record)}
                >
                  {value ? 'Ngưng' : 'Kích hoạt'}
                </Button>
              </Space>
            )
          },
          {
            title: 'Trạng thái phê duyệt',
            dataIndex: 'isApprove',
            align: 'center',
            render: (value) => (
              <Space>
                <Tag color={value ? 'green' : 'red'}>
                  {value ? 'Đã duyệt' : 'Đang chờ phê duyệt'}
                </Tag>
              </Space>
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
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => handleClickSeeDetail(record)}
                />
                <EditOutlined
                  style={{ color: '#ebca48ff', cursor: 'pointer' }}
                  onClick={() => handleEdit(record)}
                />
                <DeleteOutlined
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => showModal(record)}
                />
              </Space>
            )
          }
        ]}
        pagination={{ pageSize: 5 }}
      />

      {/* Tổng số dịch vụ */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button
          type='primary'
          onClick={handleAddService}
          icon={<PlusOutlined />}
          style={{ marginTop: 20 }}
        >
          Thêm dịch vụ
        </Button>
        <div style={{ fontWeight: 'bold' }}>
          Tổng số dịch vụ: {services?.length || 0}
        </div>
      </div>
      <Modal
        title='Xác nhận xóa địa điểm'
        open={open}
        onOk={handleRemovePlace}
        onCancel={handleCancel}
      >
        <p>
          {selectedPlace
            ? `Bạn chắc chắn xóa địa điểm: ${selectedPlace.name}`
            : ''}
        </p>
      </Modal>

      <Modal
        title='Cập nhật địa điểm'
        open={openEdit}
        onCancel={handleCloseEdit}
        footer={null}
        width={800} // rộng hơn để form đẹp
      >
        {editingPlace && (
          <FormUpdatePlace
            placeId={editingPlace._id}
            onSuccess={() => {
              dispatch(getAllPlaceOfUser()).unwrap();
              handleCloseEdit();
            }}
            onCancel={handleCloseEdit}
          />
        )}
      </Modal>
    </Card>
  );
}

export default ServiceProvide;
