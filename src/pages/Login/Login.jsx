import React from 'react';
import Login from '../../components/Login/Login';
import Header from '../../components/Header/Header';
import bgUrl from '../../assets/images/background.png';
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
          marginTop: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)' // trừ chiều cao header
        }}
      >
        <Login />
      </div>
    </div>
  );
}
