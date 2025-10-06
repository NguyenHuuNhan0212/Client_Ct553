import React, { useEffect, useState } from 'react';
import { Result, Button, Typography } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const { Paragraph, Text } = Typography;

const PaymentResult = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const status = params.get('status');
  const amount = Number(params.get('amount')) || 0;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (status === 'success') setShowConfetti(true);

    const timer = setTimeout(() => navigate('/'), 6000);
    return () => clearTimeout(timer);
  }, [status, navigate]);

  const renderResult = () => {
    switch (status) {
      case 'success':
        return (
          <Result
            status='success'
            title='Thanh toán thành công!'
            subTitle={
              <>
                <Paragraph>
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi 💙
                </Paragraph>
                <Text strong style={{ fontSize: '16px' }}>
                  Số tiền: {amount.toLocaleString()} VND
                </Text>
              </>
            }
            extra={[
              <Button type='primary' key='home' onClick={() => navigate('/')}>
                Quay lại trang chủ
              </Button>
            ]}
          />
        );

      case 'failed':
        return (
          <Result
            status='error'
            title='Thanh toán thất bại!'
            subTitle='Đã xảy ra lỗi trong quá trình xử lý giao dịch. Vui lòng thử lại hoặc chọn phương thức khác.'
            extra={[
              <Button key='retry' onClick={() => navigate(-1)}>
                Thử lại
              </Button>,
              <Button type='primary' key='home' onClick={() => navigate('/')}>
                Trang chủ
              </Button>
            ]}
          />
        );

      default:
        return (
          <Result
            status='warning'
            title='Kết quả không hợp lệ!'
            subTitle='Không thể xác minh kết quả giao dịch. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.'
            extra={
              <Button type='primary' onClick={() => navigate('/')}>
                Về trang chủ
              </Button>
            }
          />
        );
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          height: '90vh',
          background: '#f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {showConfetti && <Confetti />}
        <div
          style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            width: '500px',
            maxWidth: '90%'
          }}
        >
          {renderResult()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentResult;
