import { useEffect, useState } from 'react';
import ListPlace from './DashboardComponents/ListPlace';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; // eslint-disable-line
import { Badge, Button, Card, Space, Typography } from 'antd';
import SearchBar from '../SearchBar/SearchBar';
const { Title, Text } = Typography;
function VerifyPlace({ onSetAwaitApprove, totalAwaitApprove }) {
  const [places, setPlaces] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const filteredPlaces = places?.filter(
    (item) =>
      (!searchKeyword ||
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
      (!filterType || item.type === filterType)
  );
  const handleShowPlacesAwaitApprove = async () => {
    setFilterType('');
    setSearchKeyword('');
    try {
      const res = await placeApi.getPlacesAwaitApprove();
      setPlaces(res.places);
      onSetAwaitApprove(res.total);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách địa điểm chờ phê duyệt');
    }
  };
  const handleShowAllPlaces = async () => {
    setFilterType('');
    setSearchKeyword('');
    try {
      const res = await placeApi.getAllAdmin();
      setPlaces(res);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách địa điểm');
    }
  };
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
        <Title level={2} style={{ textAlign: 'center', marginTop: 5 }}>
          Quản lý và kiểm duyệt địa điểm
        </Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
          }}
        >
          <Space>
            <Button
              color='cyan'
              variant='solid'
              onClick={() => handleShowPlacesAwaitApprove()}
            >
              Địa điểm chờ phê duyệt
              <Badge count={totalAwaitApprove} showZero offset={[10, -25]} />
            </Button>
            <Button type='primary' onClick={() => handleShowAllPlaces()}>
              Tất cả địa điểm
            </Button>
          </Space>

          <SearchBar
            type={filterType}
            searchKeyword={searchKeyword}
            onFilterType={(type) => setFilterType(type)}
            placeholder='Tìm kiếm theo tên địa điểm...'
            onSearch={setSearchKeyword}
          />
        </div>
        <ListPlace
          places={filteredPlaces}
          setPlaces={setPlaces}
          onSetAwaitApprove={onSetAwaitApprove}
          isVerifyPlace
        />
        <div style={{ textAlign: 'right', marginRight: 10 }}>
          <Space>
            <Text type='secondary'>Tổng số địa điểm:</Text>
            <Text strong>{filteredPlaces.length || 0}</Text>
          </Space>
        </div>
      </Card>
    </motion.div>
  );
}

export default VerifyPlace;
