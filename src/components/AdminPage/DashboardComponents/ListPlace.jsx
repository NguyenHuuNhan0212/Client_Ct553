import { Button, Empty, message, Modal, Space, Table, Tag } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import dayjs from 'dayjs';
import { useState } from 'react';
import ModalApprove from './ModalApprove';
import placeApi from '../../../apis/placeService';

function ListPlace({
  places,
  setPlacesAwaitingApprove,
  onSetAwaitApprove,
  setPlaces,
  isVerifyPlace = false
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isShowModalApprove, setIsShowModalApprove] = useState(false);
  const [isShowModalReject, setIsShowModalReject] = useState(false);
  const renderType = (type) => {
    switch (type) {
      case 'hotel':
        return 'Khách sạn, nhà nghĩ';
      case 'cafe':
        return 'Quán cafe';
      case 'restaurant':
        return 'Nhà hàng, quán ăn';
      default:
        return 'Địa điểm du lịch';
    }
  };
  const renderStatusApprove = (record) => {
    const { isApprove, createdAt, updatedAt } = record;
    if (!isApprove && createdAt === updatedAt) {
      return <Tag color='warning'>Đang chờ phê duyệt</Tag>;
    } else if (!isApprove && createdAt !== updatedAt) {
      return <Tag color='error'>Từ chối địa điểm</Tag>;
    } else if (isApprove) {
      return <Tag color='success'>Địa điểm được phê duyệt</Tag>;
    }
  };
  const handleSeenDetail = (record) => {
    setSelectedPlace(record);
    setIsOpenModal(true);
  };
  const handleShowApproveModal = (record) => {
    setSelectedPlace(record);
    setIsShowModalApprove(true);
  };
  const handleApprove = async (place) => {
    try {
      await placeApi.approvePlace(place._id);
      message.success(`${place?.name} đã được phê duyệt.`);
      const res = await placeApi.getPlacesAwaitApprove();
      if (!isVerifyPlace) {
        setPlacesAwaitingApprove(res.places);
      }
      onSetAwaitApprove(res.total);
      setIsOpenModal(false);
      setIsShowModalApprove(false);
      if (isVerifyPlace) {
        const resPlace = await placeApi.getAllAdmin();
        setPlaces(resPlace);
      }
    } catch (err) {
      message.error(err?.message || 'Có lỗi khi phê duyệt');
    }
  };
  const handleShowRejectModal = (record) => {
    setSelectedPlace(record);
    setIsShowModalReject(true);
  };
  const handleReject = async (place) => {
    try {
      await placeApi.rejectPlace(place._id);
      message.success(`Từ chối địa điểm ${place.name} thành công.`);
      const res = await placeApi.getPlacesAwaitApprove();
      if (!isVerifyPlace) {
        setPlacesAwaitingApprove(res.places);
      }

      onSetAwaitApprove(res.total);
      setIsShowModalReject(false);
      if (isVerifyPlace) {
        const resPlace = await placeApi.getAllAdmin();
        setPlaces(resPlace);
      }
    } catch (err) {
      message.error(err?.message || 'Có lỗi khi phê duyệt');
    }
  };
  const renderAction = (record) => {
    return (
      <>
        <Space>
          <Button
            size='small'
            color='primary'
            variant='solid'
            onClick={() => handleSeenDetail(record)}
          >
            Xem chi tiết
          </Button>
          {record.createdAt === record.updatedAt && (
            <>
              <Button
                size='small'
                color='green'
                variant='solid'
                onClick={() => handleShowApproveModal(record)}
              >
                Phê duyệt
              </Button>
              <Button
                size='small'
                color='danger'
                variant='solid'
                onClick={() => handleShowRejectModal(record)}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      </>
    );
  };
  if (!places.length) {
    return <Empty description={'Không có địa điểm nào.'} />;
  }
  return (
    <>
      <Table
        dataSource={places}
        rowKey='_id'
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
            render: (value) => capitalizeName(value)
          },
          {
            title: 'Chủ sở hữu',
            align: 'center',
            dataIndex: ['userId', 'fullName'],
            render: (value) => capitalizeName(value)
          },
          {
            title: 'Loại địa điểm',
            align: 'center',
            dataIndex: 'type',
            render: (value) => renderType(value)
          },
          {
            title: 'Ngày đăng',
            align: 'center',
            dataIndex: 'createdAt',
            render: (value) => dayjs(value).format('DD-MM-YYYY'),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            sortDirections: ['descend', 'ascend']
          },
          {
            title: 'Trạng thái phê duyệt',
            align: 'center',
            render: (record) => renderStatusApprove(record)
          },
          {
            title: 'Thao tác',
            align: 'center',
            render: (record) => renderAction(record)
          }
        ]}
        pagination={{ pageSize: 5 }}
      />
      <ModalApprove
        open={isOpenModal}
        onOk={() => handleApprove(selectedPlace)}
        onCancel={setIsOpenModal}
        place={selectedPlace}
      />
      <Modal
        title={'Xác nhận phê duyệt địa điểm'}
        open={isShowModalApprove}
        onOk={() => handleApprove(selectedPlace)}
        onCancel={() => setIsShowModalApprove(false)}
        okText={'Xác nhận'}
        cancelText={'Đóng'}
      >
        <p>Xác nhận duyệt địa điểm {selectedPlace ? selectedPlace.name : ''}</p>
      </Modal>

      <Modal
        title={'Xác nhận từ chối địa điểm'}
        open={isShowModalReject}
        onOk={() => handleReject(selectedPlace)}
        onCancel={() => setIsShowModalReject(false)}
        okText={'Xác nhận'}
        cancelText={'Đóng'}
      >
        <p>
          Xác nhận từ chối địa điểm {selectedPlace ? selectedPlace.name : ''}
        </p>
      </Modal>
    </>
  );
}

export default ListPlace;
