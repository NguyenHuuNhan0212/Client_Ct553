import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading({
  tip = '',
  fullscreen = false,
  size = 'small',
  color = 'white'
}) {
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: size === 'large' ? 32 : 18, color }}
      spin
    />
  );

  if (fullscreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}
      >
        <Spin indicator={antIcon} size='large' tip={tip} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={antIcon} size={size} tip={tip} />
    </div>
  );
}
