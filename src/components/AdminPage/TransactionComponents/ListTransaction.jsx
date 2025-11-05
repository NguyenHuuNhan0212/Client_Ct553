import { Table, Tag } from 'antd';
import { capitalizeName } from '../../../utils/capitalize';
import dayjs from 'dayjs';

function ListTransaction({ transactions }) {
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
            render: (value) => dayjs(value).format('DD/MM/YYYY')
          },
          {
            title: 'Trạng thái',
            align: 'center',
            render: (record) => renderStatus(record)
          }
        ]}
      />
    </>
  );
}

export default ListTransaction;
