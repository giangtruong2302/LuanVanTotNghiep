import axios from "../../../../axios";
const handleGetDetailOrder = (bookingId) => {
  return axios.get(`/api/get-detail-order?bookingId=${bookingId}`);
};
const handlePayWithStripe = (
  tokenId,
  amount,
  orderId,
  bookingId,
  CustomerId,
  Status,
  createAt,
  to,
  subject,
  htmlContent
) => {
  return axios.post(`/payment-stripe`, {
    tokenId,
    amount,
    orderId,
    bookingId,
    CustomerId,
    Status,
    createAt,
    to,
    subject,
    htmlContent,
  });
};
const handleGetDetailCustomerByExternalId = (ExternalId) => {
  return axios.get(
    `/api/get-detail-customer-by-externalId?ExternalId=${ExternalId}`
  );
};
const handlePayWithMomoAPI = (orderId, amount) => {
  return axios.post(`/api/get-momo-payment-link`, {
    orderId,
    amount,
    // to,
    // subject,
    // htmlContent,
  });
};
export {
  handleGetDetailOrder,
  handlePayWithStripe,
  handleGetDetailCustomerByExternalId,
  handlePayWithMomoAPI,
};
