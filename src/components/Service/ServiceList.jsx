// import { Row, Col } from 'antd';
// import ServiceCard from './ServiceCard';

// export default function ServiceList({ places }) {
//   return (
//     <Row gutter={[16, 16]}>
//       {places?.map((s) => (
//         <Col key={s._id} xs={24} sm={12} md={8} lg={6}>
//           <ServiceCard {...s} isHotel={s.type === 'hotel'} />
//         </Col>
//       ))}
//     </Row>
//   );
// }
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ServiceCard from './ServiceCard';
import { Col, Row } from 'antd';

export default function ServiceList({ places, isSlick = false }) {
  if (isSlick) {
    return (
      <div style={{ margin: '30px 0' }}>
        <Swiper
          style={{
            '--swiper-navigation-color': '#5a5858ff',
            padding: '0 20px'
          }}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            769: { slidesPerView: 2 },
            480: { slidesPerView: 1 }
          }}
        >
          {places?.map((s) => (
            <SwiperSlide key={s._id}>
              <ServiceCard {...s} isHotel={s.type === 'hotel'} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Dạng grid mặc định
  return (
    <Row gutter={[16, 16]}>
      {places?.map((s) => (
        <Col key={s._id} xs={24} sm={12} md={8} lg={6}>
          <ServiceCard {...s} isHotel={s.type === 'hotel'} />
        </Col>
      ))}
    </Row>
  );
}
