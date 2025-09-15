import { useState } from 'react';
import { FloatButton, Drawer, Input } from 'antd';

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatButton
        icon='💬'
        type='primary'
        style={{ right: 24 }}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title='Chatbot Du Lịch'
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
        width={350}
      >
        <div
          style={{
            height: 300,
            border: '1px solid #ddd',
            padding: 8,
            marginBottom: 10,
            overflowY: 'auto'
          }}
        >
          Hỏi tôi về điểm đến nhé!
        </div>
        <Input placeholder='Nhập câu hỏi...' />
      </Drawer>
    </>
  );
}
