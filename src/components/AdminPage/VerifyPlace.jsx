import { useEffect, useState } from 'react';
import ListPlaceAwaitingApprove from './DashboardComponents/ListPlaceAwaitingApprove';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; // eslint-disable-line
import { Card, Typography } from 'antd';
import SearchBar from '../SearchBar/SearchBar';
const { Title } = Typography;
function VerifyPlace({ onSetAwaitApprove }) {
  const [places, setPlaces] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const filteredPlaces = places?.filter(
    (item) =>
      (!searchKeyword ||
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
      (!filterType || item.type === filterType)
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await placeApi.getAllAdmin();
        setPlaces(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy danh sách place');
      }
    };
    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card>
        <Title level={1} style={{ textAlign: 'center', marginTop: 5 }}>
          Quản lý và kiểm duyệt địa điểm
        </Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 16
          }}
        >
          <SearchBar
            onFilterType={(type) => setFilterType(type)}
            placeholder='Tìm kiếm theo tên địa điểm...'
            onSearch={setSearchKeyword}
          />
        </div>
        <ListPlaceAwaitingApprove
          places={filteredPlaces}
          setPlaces={setPlaces}
          onSetAwaitApprove={onSetAwaitApprove}
          isVerifyPlace
        />
      </Card>
    </motion.div>
  );
}

export default VerifyPlace;
