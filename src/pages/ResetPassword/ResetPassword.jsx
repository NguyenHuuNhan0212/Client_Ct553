import React from 'react';
import Header from '../../components/Header/Header';
import bgUrl from '../../assets/images/background.png';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header luôn ở trên cùng */}
      <Header />

      <div
        style={{
          marginTop: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)' // trừ chiều cao header
        }}
      >
        <ResetPassword />
      </div>
    </div>
  );
}
