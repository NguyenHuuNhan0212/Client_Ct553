import React from 'react';
import { Row, Col, Card, Empty } from 'antd';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList({
  itineraries = [],
  onSelect,
  isTemplate = false
}) {
  if (!itineraries.length) {
    return <Empty description={'Không có lịch trình nào.'} />;
  }
  return (
    <Row gutter={[10, 10]}>
      {itineraries.map((item, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
          <ItineraryCard
            item={item}
            onSelect={onSelect}
            isTemplate={isTemplate}
          />
        </Col>
      ))}
    </Row>
  );
}
