import axios from "../../../../axios";
const handleGetDetailOrder = (bookingId) => {
  return axios.get(`/api/get-detail-order?bookingId=${bookingId}`);
};
const handlePayWithStripe = (
  token,
  amount,
  id,
  bookingId,
  CustomerId,
  Status,
  createAt,
  to,
  subject,
  body
) => {
  return axios.post(`/payment-stripe`, {
    token,
    amount,
    id,
    bookingId,
    CustomerId,
    Status,
    createAt,
    to,
    subject,
    body,
  });
};
export { handleGetDetailOrder, handlePayWithStripe };
