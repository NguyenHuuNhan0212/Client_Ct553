import {
  Descriptions,
  Divider,
  Modal,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  CreditCardOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  UserOutlined
} from '@ant-design/icons';
const { Title, Text } = Typography;
function ListTransaction({ transactions }) {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const renderService = (record) => {
    return record?.services.map((s, index) => (
      <>
        <div key={index}>
          <b>{s.roomTypeName ? s.roomTypeName : s.serviceName}</b> - SL:{' '}
          {s.quantity}
        </div>
      </>
    ));
  };
  const renderPaymentMethod = (value) => {
    if (value === 'offline') {
      return 'Trực tiếp tại nơi';
    } else {
      return 'Chuyển khoản';
    }
  };
  const renderStatus = (record) => {
    if (
      record.paymentStatus === 'success' &&
      record.bookingStatus === 'cancelled'
    ) {
      return <Tag color='error'>Giao dịch bị hủy</Tag>;
    } else if (record.paymentStatus === 'refunded') {
      return <Tag color='cyan'>Giao dịch hủy và hoàn tiền</Tag>;
    } else if (
      record.paymentStatus === 'success' &&
      record.bookingStatus === 'paid'
    ) {
      return <Tag color='purple'>Thanh toán một phần</Tag>;
    } else if (
      record.paymentStatus === 'success' &&
      record.bookingStatus === 'confirmed'
    ) {
      return <Tag color='green'>Hoàn tất</Tag>;
    }
  };
  return (
    <>
      <Table
        dataSource={transactions}
        rowKey='_id'
        pagination={{ pageSize: 7 }}
        columns={[
          {
            title: 'STT',
            dataIndex: 'index',
            align: 'center',
            render: (_, __, index) => index + 1
          },
          {
            title: 'Người đặt',
            dataIndex: 'userBooking',
            align: 'center',
            render: (value) => (value ? capitalizeName(value) : 'Đơn nội bộ')
          },
          {
            title: 'Nhà cung cấp',
            dataIndex: 'supplier',
            align: 'center',
            render: (value) => capitalizeName(value)
          },
          {
            title: 'Địa điểm',
            dataIndex: 'placeName',
            align: 'center',
            render: (value) => capitalizeName(value)
          },
          {
            title: 'Dịch vụ',
            align: 'center',
            render: (record) => renderService(record)
          },
          {
            title: 'Số tiền',
            dataIndex: 'amount',
            align: 'center',
            render: (value) => `${value.toLocaleString()} VNĐ`
          },
          {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            align: 'center',
            render: (value) => renderPaymentMethod(value)
          },
          {
            title: 'Ngày',
            dataIndex: 'paymentDate',
            align: 'center',
            render: (value) => dayjs(value).format('DD/MM/YYYY'),
            sorter: (a, b) =>
              dayjs(a.paymentDate).valueOf() - dayjs(b.paymentDate).valueOf(),
            sortDirections: ['ascend', 'descend']
          },
          {
            title: 'Trạng thái',
            align: 'center',
            render: (record) => renderStatus(record)
          }
        ]}
        onRow={(record) => ({
          title: 'Nhấn để xem chi tiết',
          onClick: () => {
            setOpen(true);
            setSelectedRecord(record);
          }
        })}
        style={{ cursor: 'pointer' }}
      />
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            Chi tiết giao dịch
          </Title>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
      >
        {selectedRecord && (
          <Space direction='vertical' size='large' style={{ width: '100%' }}>
            <div>
              <Divider orientation='left'>
                <UserOutlined /> Người đặt
              </Divider>
              <Descriptions
                column={2}
                bordered
                size='small'
                labelStyle={{ fontWeight: 'bold', width: 140 }}
              >
                <Descriptions.Item label='Họ tên'>
                  {capitalizeName(selectedRecord.userBooking || 'Đơn nội bộ')}
                </Descriptions.Item>
                <Descriptions.Item label='Số điện thoại'>
                  {selectedRecord.userInfo?.phone || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                  {selectedRecord.userInfo?.email || '-'}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div>
              <Divider orientation='left'>
                <ShopOutlined /> Nhà cung cấp
              </Divider>
              <Descriptions
                column={2}
                bordered
                size='small'
                labelStyle={{ fontWeight: 'bold', width: 140 }}
              >
                <Descriptions.Item label='Tên'>
                  {capitalizeName(selectedRecord.supplier)}
                </Descriptions.Item>
                <Descriptions.Item label='Số điện thoại'>
                  {selectedRecord.supplierInfo?.phone || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                  {selectedRecord.supplierInfo?.email || '-'}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div>
              <Divider orientation='left'>
                <EnvironmentOutlined /> Địa điểm
              </Divider>
              <Descriptions
                column={1}
                bordered
                size='small'
                labelStyle={{ fontWeight: 'bold', width: 140 }}
              >
                <Descriptions.Item label='Tên địa điểm'>
                  {capitalizeName(selectedRecord.placeName)}
                </Descriptions.Item>
                <Descriptions.Item label='Địa chỉ'>
                  {selectedRecord.placeInfo?.address || '-'}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div>
              <Divider orientation='left'>
                <CreditCardOutlined /> Dịch vụ
              </Divider>
              <div
                style={{
                  background: '#fafafa',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #f0f0f0'
                }}
              >
                <i>{renderService(selectedRecord)}</i>
              </div>
            </div>

            <div>
              <Divider orientation='left'>
                <DollarOutlined /> Thanh toán
              </Divider>
              <Descriptions
                column={2}
                bordered
                size='small'
                labelStyle={{ fontWeight: 'bold', width: 140 }}
              >
                <Descriptions.Item label='Số tiền'>
                  <Text strong>
                    {selectedRecord.amount.toLocaleString()} VNĐ
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label='Hình thức thanh toán'>
                  {renderPaymentMethod(selectedRecord.paymentMethod)}
                </Descriptions.Item>
                <Descriptions.Item label='Ngày thanh toán'>
                  {dayjs(selectedRecord.paymentDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label='Trạng thái'>
                  {renderStatus(selectedRecord)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
}

export default ListTransaction;
