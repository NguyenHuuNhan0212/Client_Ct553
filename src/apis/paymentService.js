import axiosClient from './axiosClient';

const paymentApi = {
  createPayment(data) {
    return axiosClient.post('/payment/create-payment-url', data);
  }
};
export default paymentApi;
