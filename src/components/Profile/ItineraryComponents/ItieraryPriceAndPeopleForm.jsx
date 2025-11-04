import { Modal, Form, InputNumber, Button, Input, Descriptions } from 'antd';

export default function ItineraryPriceModal({
  open,
  onClose,
  onSubmit,
  itinerary
}) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ ...values, itineraryId: itinerary._id });
        onClose();
        form.resetFields();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      title={`Cập nhật thông tin lịch trình: ${itinerary?.title}`}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Hủy
        </Button>,
        <Button key='ok' type='primary' onClick={handleOk}>
          Lưu
        </Button>
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          priceForItinerary: itinerary?.priceForItinerary,
          people: itinerary?.people,
          description: itinerary?.description
        }}
      >
        <Form.Item
          name='priceForItinerary'
          label='Chi phí bạn đã sử dụng cho lịch trình (VNĐ)'
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder='Nhập chi phí (VD: 2000000)'
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name='people'
          label='Số người tương ứng với chi phí'
          rules={[{ required: true, message: 'Vui lòng nhập số người' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} placeholder='VD: 4' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Mô tả thêm về các dịch vụ đã sử dụng cho lịch trình (nếu có)'
        >
          <Input.TextArea
            rows={4}
            placeholder='Nhập mô tả thêm về các dịch vụ đã sử dụng cho lịch trình...'
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
