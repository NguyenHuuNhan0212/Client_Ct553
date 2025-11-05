import axiosClient from './axiosClient';

const paymentApi = {
  createPayment(data) {
    return axiosClient.post('/payment/create-payment-url', data);
  },
  getAllTransaction() {
    return axiosClient.get('/payment/admin');
  }
};
export default paymentApi;
