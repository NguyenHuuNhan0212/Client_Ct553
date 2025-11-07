import { useEffect, useState } from 'react';
import ListPlace from './DashboardComponents/ListPlace';
import placeApi from '../../apis/placeService';
import { motion } from 'motion/react'; // eslint-disable-line
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Spin,
  Typography
} from 'antd';
import SearchBar from '../SearchBar/SearchBar';
import OverviewPlace from './VerifyPlace/OverviewPlace';
import statsApi from '../../apis/statsService';
import PieChart from './DashboardComponents/Chart/PieChart';
import TopPopularPlacesChart from './DashboardComponents/Chart/BarChart';
const { Title, Text } = Typography;
function VerifyPlace({ onSetAwaitApprove, totalAwaitApprove }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [title, setTitle] = useState('Tất cả địa điểm');
  const [statsPlaceStatus, setStatsPlaceStatus] = useState(null);
  const [
    dataStatsFivePlacesHaveInItinerary,
    setDataStatsFivePlacesHaveInItinerary
  ] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const filteredPlaces = places?.filter(
    (item) =>
      (!searchKeyword ||
        item.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
      (!filterType || item.type === filterType) &&
      (!filterSupplier ||
        item.userId?.fullName?.toLowerCase() ===
          filterSupplier.toLocaleLowerCase())
  );

  const dataPieChart = [
    {
      name: 'Địa điểm đã duyệt',
      value: statsPlaceStatus?.totalPlacesApproved
    },

    {
      name: 'Địa điểm bị từ chối',
      value: statsPlaceStatus?.totalPlacesRejected
    },
    {
      name: 'Địa điểm chờ duyệt',
      value: statsPlaceStatus?.totalPlacesPendingApproved
    }
  ];
  const dataBarChartPlacesItinerary = dataStatsFivePlacesHaveInItinerary?.map(
    (item) => ({
      name: item.name,
      value: item.total
    })
  );
  const handleShowPlacesAwaitApprove = async () => {
    setFilterType('');
    setIsLoading(true);
    setSearchKeyword('');
    setFilterSupplier('');
    setTitle('Địa điểm chờ duyệt');
    try {
      const res = await placeApi.getPlacesAwaitApprove();
      setPlaces(res.places);
      onSetAwaitApprove(res.total);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách địa điểm chờ phê duyệt');
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowPlacesRejected = async () => {
    setFilterType('');
    setSearchKeyword('');
    setIsLoading(true);
    setFilterSupplier('');
    setTitle('Địa điểm bị từ chối');
    try {
      const res = await placeApi.getAllPlaceRejected();
      setPlaces(res);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách địa điểm bị từ chối');
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowAllPlaces = async () => {
    setFilterType('');
    setSearchKeyword('');
    setFilterSupplier('');
    setIsLoading(true);
    setTitle('Tất cả địa điểm');
    try {
      const res = await placeApi.getAllAdmin();
      setPlaces(res);
    } catch (err) {
      console.log(err.message || 'Lỗi lấy danh sách địa điểm');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await placeApi.getAllAdmin();
        setPlaces(res);
      } catch (err) {
        console.log(err.message || 'Lỗi lấy danh sách place');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statsApi.getStatsPlaceStatus();
        setStatsPlaceStatus(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy dữ liệu place status');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (selectedLocation) {
      const fetchData = async () => {
        try {
          const params = {
            location: selectedLocation
          };
          const res = await statsApi.getFivePlacesHaveInItinerary(params);
          setDataStatsFivePlacesHaveInItinerary(res);
        } catch (err) {
          console.log(
            err.message ||
              'Lỗi lấy thống kê 5 địa điểm có trong lịch trình nhiều nhất.'
          );
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const res = await statsApi.getFivePlacesHaveInItinerary();
          setDataStatsFivePlacesHaveInItinerary(res);
        } catch (err) {
          console.log(
            err.message ||
              'Lỗi lấy thống kê 5 địa điểm có trong lịch trình nhiều nhất.'
          );
        }
      };
      fetchData();
    }
  }, [selectedLocation]);
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
        <OverviewPlace />
        <Row gutter={[10, 10]}>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}>
              <PieChart
                data={dataPieChart}
                title={'Tỷ lệ phê duyệt địa điểm'}
              />
            </div>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <div style={{ height: '450px' }}>
              <TopPopularPlacesChart
                isManage
                data={dataBarChartPlacesItinerary}
                title='Top 5 địa điểm có trong lịch trình nhiều nhất'
                unit={'lịch trình'}
                onSetSelectedLocation={(location) =>
                  setSelectedLocation(location)
                }
              />
            </div>
          </Col>
        </Row>
        <Divider />
        <Title level={3}>Danh sách địa điểm</Title>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
          }}
        >
          <Space>
            <Button type='primary' onClick={() => handleShowAllPlaces()}>
              Tất cả địa điểm
            </Button>
            <Button
              color='cyan'
              variant='outlined'
              onClick={() => handleShowPlacesAwaitApprove()}
            >
              Địa điểm chờ phê duyệt
              <Badge count={totalAwaitApprove} showZero offset={[10, -25]} />
            </Button>

            <Button
              color='danger'
              variant='outlined'
              onClick={() => handleShowPlacesRejected()}
            >
              Địa điểm bị từ chối{' '}
            </Button>
          </Space>

          <SearchBar
            type={filterType}
            searchKeyword={searchKeyword}
            onFilterType={(type) => setFilterType(type)}
            placeholder='Tìm kiếm theo tên địa điểm...'
            onSearch={setSearchKeyword}
            isAdmin
            supplier={filterSupplier}
            onFilterSupplier={(supplier) => setFilterSupplier(supplier)}
          />
        </div>
        <Text type='secondary'>{title}</Text>
        <div style={{ position: 'relative' }}>
          <Spin spinning={isLoading}>
            <ListPlace
              places={filteredPlaces}
              setPlaces={setPlaces}
              onSetStatsPlaceStatus={setStatsPlaceStatus}
              onSetAwaitApprove={onSetAwaitApprove}
              isVerifyPlace
            />
          </Spin>
        </div>

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
