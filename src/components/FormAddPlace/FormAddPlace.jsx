import React, { useState } from 'react';
import { Form, Button, Card, Tabs, Typography } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import placeApi from '../../apis/placeService';
import GeneralInfoTab from './GeneralInfoTab';
import ServiceTab from './ServiceTab';
import RoomTypeTab from './RoomTypeTab';
import styles from './style.module.css';
const { Title } = Typography;
const FormAddPlace = () => {
  const { container, btn } = styles;
  const [form] = Form.useForm();
  const [type, setType] = useState('touristSpot');
  const [roomTypes, setRoomTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const navigate = useNavigate();

  // Submit
  const onFinish = async (values) => {
    if (type === 'hotel') {
      if (!roomTypes.length) {
        return toast.error('Bạn phải nhập ít nhất 1 loại phòng');
      }
    } else {
      for (let rt of roomTypes) {
        if (!rt.name || !rt.capacity || !rt.totalRooms || !rt.pricePerNight) {
          return toast.error('Vui lòng điền đầy đủ thông tin loại phòng!');
        }
      }
    }
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj);
    });
    formData.append('roomTypes', JSON.stringify(roomTypes));
    formData.append('services', JSON.stringify(services));

    try {
      await placeApi.addPlace(formData);
      form.resetFields();
      setRoomTypes([]);
      setServices([]);
      toast.success('Thêm địa điểm thành công!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message);
    }
  };

  // Upload handlers
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width:100%"/>`);
  };

  // Room handlers
  const addRoomType = () =>
    setRoomTypes([
      ...roomTypes,
      { name: '', capacity: 0, totalRooms: 0, pricePerNight: 0 }
    ]);
  const updateRoomType = (i, field, value) => {
    const newRooms = [...roomTypes];
    newRooms[i][field] = value;
    setRoomTypes(newRooms);
  };
  const removeRoomType = (i) =>
    setRoomTypes(roomTypes.filter((_, idx) => idx !== i));

  // Service handlers
  const addService = () =>
    setServices([
      ...services,
      { name: '', description: '', price: 0, type: '' }
    ]);
  const updateService = (i, field, value) => {
    const newServices = [...services];
    newServices[i][field] = value;
    setServices(newServices);
  };
  const removeService = (i) =>
    setServices(services.filter((_, idx) => idx !== i));

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin chung',
      children: (
        <GeneralInfoTab
          fileList={fileList}
          handleChange={handleChange}
          handlePreview={handlePreview}
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
          addService={addService}
          updateService={updateService}
          removeService={removeService}
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
          addRoomType={addRoomType}
          updateRoomType={updateRoomType}
          removeRoomType={removeRoomType}
        />
      )
    });
  }
  // Xử lý Next / Submit
  const handleNext = () => {
    const lastKey = tabItems[tabItems.length - 1].key;
    if (activeKey === lastKey) {
      form.submit(); // submit form
    } else {
      const nextKey = (parseInt(activeKey) + 1).toString();
      setActiveKey(nextKey);
    }
  };
  return (
    <Card className={container}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Thêm dịch vụ mới
      </Title>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Tabs
          type='card'
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
        />
        <Form.Item className={btn}>
          <Button type='primary' block onClick={handleNext}>
            {activeKey === tabItems[tabItems.length - 1].key
              ? 'Lưu địa điểm'
              : 'Tiếp theo'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormAddPlace;
