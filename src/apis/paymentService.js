import axiosClient from './axiosClient';

const paymentApi = {
  createPayment(data) {
    return axiosClient.post('/payment/create-payment-url', data);
  },
  getAllTransaction() {
    return axiosClient.get('/payment/admin');
  },
  getAllTransactionCancelled() {
    return axiosClient.get('/payment/admin/transaction-cancelled');
  },
  getAllTransactionSuccess() {
    return axiosClient.get('/payment/admin/transaction-success');
  }
};
export default paymentApi;
