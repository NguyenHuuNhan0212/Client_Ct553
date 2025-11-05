import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Tabs, Typography } from 'antd';
import { toast } from 'react-toastify';
import placeApi from '../../apis/placeService';
import GeneralInfoTab from './GeneralInfoTab';
import ServiceTab from './ServiceTab';
import RoomTypeTab from './RoomTypeTab';
import styles from './style.module.css';

const { Title } = Typography;
const BASE_URL = 'http://localhost:3000';
const FormUpdatePlace = ({ placeId, typeCurrent, onSuccess }) => {
  const { containerUpdate, btn } = styles;
  const [form] = Form.useForm();
  const [type, setType] = useState(typeCurrent);
  const [roomTypes, setRoomTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [activeKey, setActiveKey] = useState('1');

  // Load dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      let place = null;
      try {
        const res = await placeApi.getOnePlace(placeId);
        place = res.info;
        setServices(res.services || []);
        setRoomTypes(res.hotelDetail?.roomTypes || []);
        setType(place.type);
        form.setFieldsValue({
          name: place.name,
          description: place.description,
          province: place.address?.split(',')[1]?.trim(),
          ward: place.address?.split(',')[0]?.trim(),
          facilities: res.hotelDetail?.facilities
        });

        setFileList(
          (place.images || []).map((path, i) => ({
            uid: String(i),
            name: path.split('/').pop(), // lấy tên file cuối cùng
            status: 'done',
            url: `${BASE_URL}/${path}` // ghép baseURL + đường dẫn lưu trong DB
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error('Không tải được dữ liệu địa điểm');
      }
    };
    fetchData();
  }, [placeId, typeCurrent, form]);

  const onFinish = async (values) => {
    const address = `${values.ward}, ${values.province}`;
    const payload = { ...values, address };
    if (type === 'hotel') {
      // validate roomTypes
      if (!roomTypes.length) {
        return toast.error('Bạn phải nhập ít nhất 1 loại phòng');
      }
      for (let rt of roomTypes) {
        if (!rt.name || !rt.capacity || !rt.totalRooms || !rt.pricePerNight) {
          return toast.error('Vui lòng điền đầy đủ thông tin loại phòng!');
        }
      }
    }
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    fileList.forEach((file) => {
      if (file.originFileObj) {
        // Ảnh mới upload -> gửi file để multer xử lý
        formData.append('images', file.originFileObj);
      } else if (file.url) {
        // Ảnh cũ còn giữ lại -> gửi lại path cũ
        const path = file.url.replace(BASE_URL + '/', '');
        formData.append('images', path);
      }
    });
    const hotelDetail = {
      facilities: values.facilities || [],
      roomTypes: roomTypes
    };
    formData.append('hotelDetail', JSON.stringify(hotelDetail));
    formData.append('services', JSON.stringify(services));
    console.log([...formData]);
    try {
      await placeApi.updatePlace(placeId, formData);
      toast.success('Cập nhật địa điểm thành công!');
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Lỗi cập nhật');
    }
  };

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin chung',
      children: (
        <GeneralInfoTab
          type={type}
          fileList={fileList}
          handleChange={({ fileList }) => setFileList(fileList)}
          setType={setType}
        />
      )
    },
    {
      key: '2',
      label: 'Dịch vụ',
      children: (
        <ServiceTab
          services={services}
          addService={() =>
            setServices([
              ...services,
              { name: '', description: '', price: 0, type: '' }
            ])
          }
          updateService={(i, field, value) => {
            const newServices = [...services];
            newServices[i][field] = value;
            setServices(newServices);
          }}
          removeService={(i) =>
            setServices(services.filter((_, idx) => idx !== i))
          }
        />
      )
    }
  ];

  if (type === 'hotel') {
    tabItems.push({
      key: '3',
      label: 'Loại phòng',
      children: (
        <RoomTypeTab
          roomTypes={roomTypes}
          addRoomType={() =>
            setRoomTypes([
              ...roomTypes,
              { name: '', capacity: 1, totalRooms: 1, pricePerNight: 100 }
            ])
          }
          updateRoomType={(i, field, value) => {
            const newRooms = [...roomTypes];
            newRooms[i][field] = value;
            setRoomTypes(newRooms);
          }}
          removeRoomType={(i) =>
            setRoomTypes(roomTypes.filter((_, idx) => idx !== i))
          }
        />
      )
    });
  }

  return (
    <Card className={containerUpdate}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Cập nhật địa điểm
      </Title>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Tabs
          type='card'
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
        />
        <div className={btn}>
          <Button type='primary' block htmlType='submit'>
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormUpdatePlace;
