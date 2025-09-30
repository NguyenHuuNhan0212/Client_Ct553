import { Typography } from 'antd';

import HotelList from '../HotelList';
const { Title } = Typography;
function SearchResult({ hotels }) {
  return (
    <div style={{ padding: '0 20px 40px 20px' }}>
      <Title
        level={2}
        style={{ marginBottom: 40, marginTop: -10, textAlign: 'center' }}
      >
        Danh sách khách sạn phù hợp
      </Title>

      <HotelList hotels={hotels} />
    </div>
  );
}

export default SearchResult;
