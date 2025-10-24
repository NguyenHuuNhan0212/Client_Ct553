import React from 'react';
import { DatePicker, ConfigProvider, Typography, Space } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');
const { RangePicker } = DatePicker;
const { Text } = Typography;

const DateFilter = ({ onChange }) => {
  const handleDateChange = (values) => {
    if (!values || values.length !== 2) {
      onChange(null);
      return;
    }

    const [start, end] = values;

    onChange({
      from: dayjs(start).startOf('month').toISOString(),
      to: dayjs(end).endOf('month').toISOString()
    });
  };

  return (
    <ConfigProvider locale={viVN}>
      <Space style={{ width: '100%' }}>
        <Text strong>Chọn tháng: </Text>
        <RangePicker
          format='MM-YYYY'
          picker='month'
          onChange={handleDateChange}
          disabledDate={(current) => current && current > dayjs().endOf('day')}
          style={{ width: '100%' }}
        />
      </Space>
    </ConfigProvider>
  );
};

export default DateFilter;
