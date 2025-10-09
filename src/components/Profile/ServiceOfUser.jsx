import {
  Card,
  Table,
  Tag,
  Button,
  Typography,
  Space,
  Modal,
  message,
  Tooltip
} from 'antd';
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
import placeApi from '../../apis/placeService';
import FormUpdatePlace from '../FormPlace/FormUpdatePlace';
import { capitalizeName } from '../../utils/capitalize';
import SearchBar from '../SearchBar/SearchBar';
const { Title, Text } = Typography;
function ServiceProvide() {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  const { placesOffUser: services, loading } = useSelector(
    (state) => state.place
  );
  const navigate = useNavigate();
  const filteredServices = services?.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
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
    if (record.type === 'hotel') {
      return navigate(`/hotel/${record._id}`);
    } else {
      return navigate(`/place/${record._id}`);
    }
  };

  const showModal = (record) => {
    setSelectedPlace(record);
    setOpen(true);
  };

  const handleRemovePlace = async () => {
    if (!selectedPlace) return;
    try {
      await placeApi.deletePlace(selectedPlace._id);
      await dispatch(getAllPlaceOfUser()).unwrap();
      setOpen(false);
      message.success(`Đã xóa "${selectedPlace.name}" thành công.`);
    } catch (err) {
      message.error(err.response?.data);
    }
  };
  const handleToggleStatus = async (record) => {
    try {
      await placeApi.updateStatusActive(record._id);
      await dispatch(getAllPlaceOfUser()).unwrap();
      message.success(
        `Cập nhật trạng thái hoạt động của ${record.name} thành công`
      );
    } catch (err) {
      message.error(err.response?.data);
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
        <Title level={1} style={{ textAlign: 'center' }}>
          Dịch vụ của tôi
        </Title>
      }
      style={{ borderRadius: 10, padding: 20 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16
        }}
      >
        <SearchBar
          placeholder='Tìm kiếm theo tên địa điểm...'
          onSearch={setSearchKeyword}
        />
      </div>
      <Table
        dataSource={filteredServices}
        rowKey='_id'
        loading={loading}
        columns={[
          {
            title: 'STT',
            dataIndex: 'index',
            align: 'center',
            render: (_, __, index) => index + 1
          },
          {
            title: 'Tên địa điểm',
            align: 'center',
            dataIndex: 'name',
            render: (value) => <Title level={5}>{capitalizeName(value)}</Title>
          },
          {
            title: 'Loại địa điểm',
            align: 'center',
            dataIndex: 'type',
            render: (value) => (
              <Text>
                {value === 'hotel'
                  ? 'Khách sạn, nhà nghĩ'
                  : value === 'cafe'
                  ? 'Quán cafe'
                  : value === 'restaurant'
                  ? 'Quán ăn'
                  : 'Địa điểm du lịch'}
              </Text>
            )
          },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
            align: 'center',
            render: (value) => (
              <Tag color={value ? 'green' : 'red'}>
                {value ? 'Đang hoạt động' : 'Ngưng hoạt động'}
              </Tag>
            )
          },
          {
            title: 'Cập nhật trạng thái hoạt động',
            dataIndex: 'isActive',
            align: 'center',
            render: (value, record) => (
              <Button
                type={value ? 'default' : 'primary'}
                color={value ? 'danger' : ''}
                variant={value ? 'solid' : ''}
                size='small'
                onClick={() => handleToggleStatus(record)}
              >
                {value ? 'Ngưng' : 'Kích hoạt'}
              </Button>
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
                <Tooltip title={'Xem chi tiết địa điểm'}>
                  <EyeOutlined
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => handleClickSeeDetail(record)}
                  />
                </Tooltip>
                <Tooltip title={'Chỉnh sửa địa điểm'}>
                  <EditOutlined
                    style={{ color: '#ebca48ff', cursor: 'pointer' }}
                    onClick={() => handleEdit(record)}
                  />
                </Tooltip>
                <Tooltip title={'Xóa địa điểm'}>
                  <DeleteOutlined
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => showModal(record)}
                  />
                </Tooltip>
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
        okText={'Xác nhận xóa'}
        cancelText={'Hủy'}
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
        width={800}
      >
        {editingPlace && (
          <FormUpdatePlace
            typeCurrent={editingPlace.type}
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
