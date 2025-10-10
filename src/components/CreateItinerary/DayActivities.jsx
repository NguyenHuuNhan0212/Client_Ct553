import React from 'react';
import {
  Collapse,
  List,
  Card,
  Button,
  Input,
  Space,
  TimePicker,
  Empty,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import {
  DeleteOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Panel } = Collapse;
const { Text } = Typography;

export default function DayActivities({ form, setForm, removeActivity }) {
  return (
    <Collapse
      accordion
      style={{
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      {form.details.length === 0 ? (
        <Empty description='Chưa có ngày nào được tạo' />
      ) : (
        form.details.map((day, dayIndex) => (
          <Panel
            header={`📅 Ngày ${day.day}`}
            key={day.day}
            style={{ borderRadius: 12, overflow: 'hidden' }}
          >
            <List
              dataSource={day.activities}
              locale={{ emptyText: 'Chưa có hoạt động nào' }}
              renderItem={(act, actIndex) => (
                <Card
                  hoverable
                  size='small'
                  style={{
                    marginBottom: 12,
                    borderRadius: 14,
                    border: '1px solid #eee',
                    overflow: 'hidden',
                    background: '#fafafa'
                  }}
                  styles={{ body: { padding: 12 } }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12
                    }}
                  >
                    {/* ẢNH */}
                    {act.image ? (
                      <img
                        src={`http://localhost:3000/${act.image}`}
                        alt={act.placeName}
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: 'cover',
                          borderRadius: 10,
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 10,
                          background: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#aaa',
                          fontSize: 12
                        }}
                      >
                        No Image
                      </div>
                    )}

                    {/* THÔNG TIN */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Text strong style={{ fontSize: 15 }}>
                          {act.placeName}
                        </Text>
                        <Button
                          type='text'
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeActivity(dayIndex, actIndex)}
                        />
                      </div>
                      <div>
                        {act.address && (
                          <Text
                            type='secondary'
                            style={{
                              display: 'block',
                              fontSize: 13,
                              marginTop: 2
                            }}
                          >
                            <EnvironmentOutlined /> {act.address}
                          </Text>
                        )}

                        {/* TAG DỊCH VỤ */}
                        <Space wrap size={[4, 4]} style={{ marginTop: 6 }}>
                          {(act.services || []).map((s, idx) => (
                            <Tag key={idx} color='blue'>
                              #{s.name}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      {/* GHI CHÚ + GIỜ */}
                      <Input.TextArea
                        rows={2}
                        placeholder='Ghi chú...'
                        value={act.note}
                        onChange={(e) => {
                          const updated = [...form.details];
                          updated[dayIndex].activities[actIndex].note =
                            e.target.value;
                          setForm({ ...form, details: updated });
                        }}
                        style={{ marginTop: 8, borderRadius: 8 }}
                      />

                      <Space style={{ marginTop: 8 }}>
                        <TimePicker
                          placeholder='Bắt đầu'
                          format='HH:mm'
                          value={
                            act.startTime ? dayjs(act.startTime, 'HH:mm') : null
                          }
                          onChange={(t, str) => {
                            const updated = [...form.details];
                            updated[dayIndex].activities[actIndex].startTime =
                              str;
                            setForm({ ...form, details: updated });
                          }}
                        />
                        <TimePicker
                          placeholder='Kết thúc'
                          format='HH:mm'
                          value={
                            act.endTime ? dayjs(act.endTime, 'HH:mm') : null
                          }
                          onChange={(t, str) => {
                            const updated = [...form.details];
                            updated[dayIndex].activities[actIndex].endTime =
                              str;
                            setForm({ ...form, details: updated });
                          }}
                        />
                      </Space>
                    </div>
                  </div>
                </Card>
              )}
            />
          </Panel>
        ))
      )}
    </Collapse>
  );
}
