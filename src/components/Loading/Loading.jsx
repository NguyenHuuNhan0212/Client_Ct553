import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './style.module.css';
export default function Loading({
  tip = '',
  fullscreen = false,
  size = 'small',
  color = 'white'
}) {
  const { containerFullScreen } = styles;
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: size === 'large' ? 32 : 18, color }}
      spin
    />
  );

  if (fullscreen) {
    return (
      <div className={containerFullScreen}>
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
