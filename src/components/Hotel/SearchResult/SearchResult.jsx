import { Typography } from 'antd';

import HotelList from '../HotelList';
const { Title } = Typography;
function SearchResult() {
  const hotels = [
    {
      hotelId: '68d9df3b011559770cd8d654',
      name: 'Nhà trọ lê nguyễn',
      description: '<p>Motel&nbsp;là loại hình lưu trú bình dân...</p>',
      images: [
        'uploads/1759108923127-eden-garden-hotel-sai-gon.jpeg',
        'uploads/1759108923149-kinh-doanh-nha-nghi-binh-dan-2.jpg'
      ],
      minPricePerNight: 106,
      minTotal: 318,
      nights: 3,
      availableRoomTypesCount: 2
    },
    {
      hotelId: '68da1643201eae1d07a35690',
      name: 'Nhà trọ cây xanh',
      description: '<p>Đây là mô tả cho nhà trọ</p>',
      images: [
        'uploads/1759123011204-eden-garden-hotel-sai-gon.jpeg',
        'uploads/1759123011232-kinh-doanh-nha-nghi-binh-dan-2.jpg'
      ],
      minPricePerNight: 100,
      minTotal: 300,
      nights: 3,
      availableRoomTypesCount: 2
    }
  ];

  return (
    <div style={{ padding: '0 20px 40px 20px' }}>
      <Title
        level={2}
        style={{ marginBottom: 40, marginTop: -10, textAlign: 'center' }}
      >
        Kết quả tìm kiếm
      </Title>

      <HotelList hotels={hotels} />
    </div>
  );
}

export default SearchResult;
