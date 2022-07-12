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
export {
  handleGetDetailOrder,
  handlePayWithStripe,
  handleGetDetailCustomerByExternalId,
};
