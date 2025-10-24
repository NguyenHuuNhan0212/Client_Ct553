import React, { useState } from 'react';
import { Form, Input, Select, Upload, Row, Col, Image, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddressSelector from './AddressSelector';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;
const { Text } = Typography;
const GeneralInfoTab = ({
  fileList,
  handleChange,
  handlePreview,
  setType,
  previewImage,
  previewOpen,
  setPreviewImage,
  setPreviewOpen,
  type = 'touristSpot'
}) => {
  const [description, setDescription] = useState('');
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='name'
            label='Tên địa điểm'
            rules={[{ required: true }]}
          >
            <Input placeholder='Nhập tên địa điểm' />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='type'
            label='Loại địa điểm'
            initialValue={type}
            rules={[{ required: true }]}
          >
            <Select onChange={(val) => setType(val)}>
              <Option value='hotel'>Khách sạn/nhà nghỉ</Option>
              <Option value='restaurant'>Nhà hàng/quán ăn</Option>
              <Option value='cafe'>Quán cafe</Option>
              <Option value='touristSpot'>Địa điểm du lịch</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <AddressSelector />

      {/* Mô tả dùng React Quill */}
      <Form.Item name='description' label='Mô tả'>
        <ReactQuill
          theme='snow'
          value={description}
          onChange={setDescription}
          placeholder='Nhập mô tả chi tiết...'
          style={{ background: 'white' }}
        />
      </Form.Item>

      <Form.Item
        label='Ảnh địa điểm (có đuôi .jpeg, .jpg, .png)'
        required
        style={{ marginBottom: 40 }}
      >
        <Text type='danger' italic>
          Ảnh đầu tiên là ảnh bìa hiển thị
        </Text>
        <Upload
          multiple
          listType='picture-card'
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          beforeUpload={() => false}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
          </div>
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage('')
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
    </>
  );
};

export default GeneralInfoTab;
