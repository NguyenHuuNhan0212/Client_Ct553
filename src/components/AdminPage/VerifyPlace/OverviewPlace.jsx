import {
  BankOutlined,
  CoffeeOutlined,
  HomeOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import placeApi from '../../../apis/placeService';
const { Text } = Typography;
function OverviewPlace() {
  const [statsPlace, setStatsPlace] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await placeApi.getStatsPlace();
        setStatsPlace(res);
      } catch (err) {
        console.log(err.message || 'Lỗi khi lấy dữ liệu');
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 10, marginBottom: 10 }}>
        {statsPlace?.placesGroupType?.map((p) => {
          if (p._id === 'restaurant') {
            return (
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                  <Statistic
                    title={
                      <Text strong type='secondary'>
                        Tổng số địa điểm loại quán ăn
                      </Text>
                    }
                    valueStyle={{ color: '#019c7dff', fontWeight: 600 }}
                    prefix={<ShopOutlined />}
                    value={p.totalPlace}
                  />
                </Card>
              </Col>
            );
          } else if (p._id === 'hotel') {
            return (
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                  <Statistic
                    title={
                      <Text strong type='secondary'>
                        Tổng số địa điểm loại địa điểm lưu trú
                      </Text>
                    }
                    valueStyle={{ color: '#3f8600', fontWeight: 600 }}
                    prefix={<HomeOutlined />}
                    value={p.totalPlace}
                  />
                </Card>
              </Col>
            );
          } else if (p._id === 'cafe') {
            return (
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                  <Statistic
                    title={
                      <Text strong type='secondary'>
                        Tổng số địa điểm loại quán cafe
                      </Text>
                    }
                    valueStyle={{ color: '#115aa3ff', fontWeight: 600 }}
                    prefix={<CoffeeOutlined />}
                    value={p.totalPlace}
                  />
                </Card>
              </Col>
            );
          } else {
            return (
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card>
                  <Statistic
                    title={
                      <Text strong type='secondary'>
                        Tổng số địa điểm loại địa điểm du lịch
                      </Text>
                    }
                    valueStyle={{ color: '#a3119cff', fontWeight: 600 }}
                    prefix={<BankOutlined />}
                    value={p.totalPlace}
                  />
                </Card>
              </Col>
            );
          }
        })}
      </Row>
    </>
  );
}

export default OverviewPlace;
