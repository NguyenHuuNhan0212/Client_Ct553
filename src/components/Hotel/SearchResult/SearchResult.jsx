import { Divider, Typography } from 'antd';

import HotelList from '../HotelList';
const { Title } = Typography;
function SearchResult({ hotels, isPopular = false }) {
  return (
    <div style={{ padding: '0 20px 40px 20px' }}>
      <Title
        level={2}
        style={{ marginBottom: 40, marginTop: -10, textAlign: 'center' }}
      >
        {isPopular ? (
          <Divider style={{ fontSize: 30 }}>
            Danh sách địa điểm lưu trú nổi bật
          </Divider>
        ) : (
          <Divider style={{ fontSize: 30 }}>Danh sách kết quả tìm kiếm</Divider>
        )}
      </Title>

      <HotelList hotels={hotels} />
    </div>
  );
}

export default SearchResult;
