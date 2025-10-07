import React from 'react';
import {
  Collapse,
  List,
  Card,
  Button,
  Input,
  Space,
  TimePicker,
  Empty
} from 'antd';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Panel } = Collapse;

export default function DayActivities({ form, setForm, removeActivity }) {
  return (
    <Collapse style={{ marginTop: 10, marginBottom: 10 }} accordion>
      {form.details.length === 0 ? (
        <Empty description='Chưa có ngày nào được tạo' />
      ) : (
        form.details.map((day, dayIndex) => (
          <Panel header={`📅 Ngày ${day.day}`} key={day.day}>
            <List
              dataSource={day.activities}
              locale={{ emptyText: 'Chưa có hoạt động nào' }}
              renderItem={(act, actIndex) => (
                <Card
                  size='small'
                  style={{
                    marginBottom: 12,
                    background: '#fafafa',
                    borderRadius: 12,
                    border: '1px solid #eee'
                  }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 600 }}>
                      <DragOutlined style={{ marginRight: 6 }} />
                      {act.placeName}
                    </span>
                    <Button
                      type='text'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeActivity(dayIndex, actIndex)}
                    />
                  </div>

                  <Input.TextArea
                    rows={2}
                    placeholder='Ghi chú'
                    value={act.note}
                    onChange={(e) => {
                      const updated = [...form.details];
                      updated[dayIndex].activities[actIndex].note =
                        e.target.value;
                      setForm({ ...form, details: updated });
                    }}
                    style={{ marginTop: 8 }}
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
                        updated[dayIndex].activities[actIndex].startTime = str;
                        setForm({ ...form, details: updated });
                      }}
                    />
                    <TimePicker
                      placeholder='Kết thúc'
                      format='HH:mm'
                      value={act.endTime ? dayjs(act.endTime, 'HH:mm') : null}
                      onChange={(t, str) => {
                        const updated = [...form.details];
                        updated[dayIndex].activities[actIndex].endTime = str;
                        setForm({ ...form, details: updated });
                      }}
                    />
                  </Space>
                </Card>
              )}
            />
          </Panel>
        ))
      )}
    </Collapse>
  );
}
