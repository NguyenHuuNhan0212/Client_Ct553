import { Input, Carousel } from 'antd';
import banner1 from '../../assets/images/wellcome.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner.png';
import styles from './style.module.css';
import SearchBar from '../Search/Search';

export default function Banner() {
  const { container, heroOverlay, heroContent, title, des, searchBox } = styles;

  const banners = [
    {
      id: 1,
      image: banner1,
      title: 'Khám phá thế giới của bạn',
      desc: 'Tìm kiếm khách sạn, tour du lịch và trải nghiệm tuyệt vời chỉ trong vài giây.'
    },
    {
      id: 2,
      image: banner2,
      title: 'Trải nghiệm độc đáo',
      desc: 'Khám phá những điểm đến hấp dẫn nhất.'
    },
    {
      id: 3,
      image: banner3,
      title: 'Đặt dịch vụ nhanh chóng',
      desc: 'Mọi thứ chỉ trong một nền tảng tiện lợi.'
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Carousel autoplay autoplaySpeed={3000} speed={500}>
        {banners.map((item) => (
          <div key={item.id}>
            <div
              className={container}
              style={{
                backgroundImage: `url(${item.image})`,
                marginTop: 57
              }}
            >
              <div className={heroOverlay}></div>
              <div className={heroContent}>
                <h1 className={title}>{item.title}</h1>
                <p className={des}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* search box nằm đè lên banner */}
      <div className={searchBox}>
        <SearchBar />
      </div>
    </div>
  );
}
