import React from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Row,
  Col,
  Image
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddressSelector from './AddressSelector';

const { Option } = Select;

const GeneralInfoTab = ({
  fileList,
  handleChange,
  handlePreview,
  setType,
  previewImage,
  previewOpen,
  setPreviewImage,
  setPreviewOpen
}) => (
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
          initialValue='touristSpot'
          rules={[{ required: true }]}
        >
          <Select onChange={(val) => setType(val)}>
            <Option value='hotel'>Khách sạn/nhà nghĩ</Option>
            <Option value='restaurant'>Nhà hàng</Option>
            <Option value='cafe'>Quán cafe</Option>
            <Option value='touristSpot'>Địa điểm du lịch</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    {/* <Form.Item name='address' label='Địa chỉ' rules={[{ required: true }]}>
      <Input placeholder='Nhập địa chỉ' />
    </Form.Item> */}
    <AddressSelector />
    <Form.Item name='description' label='Mô tả'>
      <Input.TextArea rows={3} placeholder='Nhập mô tả' />
    </Form.Item>

    <Form.Item name='avgPrice' label='Giá trung bình'>
      <InputNumber style={{ width: '100%' }} min={0} />
    </Form.Item>

    <Form.Item label='Ảnh địa điểm' required style={{ marginBottom: 40 }}>
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

export default GeneralInfoTab;
