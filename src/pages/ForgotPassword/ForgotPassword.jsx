import React from 'react';
import Header from '../../components/Header/Header';
import bgUrl from '../../assets/images/background.png';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
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

      {/* Form đăng ký căn giữa */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 64,
          minHeight: 'calc(100vh - 64px)' // trừ chiều cao header
        }}
      >
        <ForgotPassword />
      </div>
    </div>
  );
}
