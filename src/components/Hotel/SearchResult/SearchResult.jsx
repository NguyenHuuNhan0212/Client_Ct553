import { Divider, Typography } from 'antd';
import { motion } from 'motion/react'; // eslint-disable-line
import HotelList from '../HotelList';
import ServiceList from '../../Service/ServiceList';
const { Title } = Typography;
function SearchResult({ hotels, isPopular = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div style={{ padding: '0 20px 40px 20px' }}>
        {isPopular ? (
          <>
            <Divider style={{ fontSize: 30, textAlign: 'center' }}>
              Địa điểm lưu trú nổi bật
            </Divider>
            <ServiceList places={hotels} />
          </>
        ) : (
          <>
            <Divider style={{ fontSize: 30 }}>
              Danh sách kết quả tìm kiếm
            </Divider>
            <HotelList hotels={hotels} />{' '}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default SearchResult;
