import axios from 'axios';
import { createRequest } from '../containers/TransferManager/actions';
// const BaseUrl = 'http://139.59.88.76:5010/api/v1/';
const BaseUrl = 'http://127.0.0.1:5010/api/v1/';
// const BaseUrl = 'https://tokensaleapis.zineum.io/api/v1/';

export default {
  user: {
    vote: (list, headers) =>
      axios.post(`${BaseUrl}user/vote`, list, headers).then((res) => res.data).catch((err) => err.response.data),
    profile: (headers) =>
      axios.get(`${BaseUrl}user/profile`, headers).then((res) => res.data).catch((err) => err.response.data),
    login: (credentials) =>
      axios.post(`${BaseUrl}login/local`, credentials).then((res) => res.data).catch((err) => err.response.data),

    signup: (user) =>
      axios.post(`${BaseUrl}signup/local`, user).then((res) => res.data).catch((err) => err.response.data),

    enable2fa: (headers) =>
      axios.put(`${BaseUrl}2fa/enable`, {}, headers).then((res) => res.data).catch((err) => err.response.data),
    forgot: (data) =>
      axios.post(`${BaseUrl}user/forgot-password`, data).then((res) => res.data).catch((err) => err.response.data),
    validateToken: (token) =>
      axios.get(`${BaseUrl}account/verify/${token}`),
    resetPassword: (user, headers) =>
      axios.post(`${BaseUrl}user/reset-password`, user, headers).then((res) => res.data).catch((err) => err.response.data),

    resetWithToken: (token, body) =>
      axios.put(`${BaseUrl}user/forgot-password/change/${token}`, body).then((res) => res.data).catch((err) => err.response.data),
    verify2fa: (otp, headers) =>
      axios.put(`${BaseUrl}2fa/verify-setup`, otp, headers).then((res) => res.data).catch((err) => err.response.data),
    disable2fa: (headers) =>
      axios.put(`${BaseUrl}2fa/disable`, {}, headers).then((res) => res.data).catch((err) => err.response.data),
    resendMail: (data) =>
      axios.put(`${BaseUrl}user/resend-verification-email`, data).then((res) => res.data).catch((err) => err.response.data),
    getContributionData: (headers) =>
      axios.get(`${BaseUrl}user/deposit`, headers).then((res) => res.data).catch((err) => err.response.data),
    deposit: (headers, body) =>
      axios.put(`${BaseUrl}user/transactionfordeposit`, body, headers).then((res) => res.data).catch((err) => err.response.data),
    depositWithHash: (headers, body) =>
      axios.put(`${BaseUrl}user/transactionHashUpdate`, body, headers).then((res) => res.data).catch((err) => err.response.data),
    confirm: (token) =>
      axios
        .post('/api/auth/confirmation', { token })
        .then((res) => res.data.user),
    resetPasswordRequest: (email) =>
      axios.post('/api/auth/reset_password_request', { email }),
    fetchUserTransactions: (headers, page) =>
      axios.get(`${BaseUrl}user/transactions?page=${page}`, headers).then((res) => res.data).catch((err) => err.response.data),
    submitSocialDetails: (headers, socialDetails) =>
      axios.put(`${BaseUrl}user/profile`, socialDetails, headers).then((res) => res.data).catch((err) => err.response.data),
    updateKycDetails: (headers, details) =>
      axios.patch(`${BaseUrl}user/kycDetails`, details, headers).then((res) => res.data).catch((err) => err.response.data),
    uploadKycDoc: (headers, doc) =>
      axios.patch(`${BaseUrl}user/kycDocs`, doc, headers).then((res) => res.data).catch((err) => err.response.data),
    updateProfile: (headers, doc) =>
      axios.put(`${BaseUrl}user/Profile`, doc, headers).then((res) => res.data).catch((err) => err.response.data),
    support: (headers, data) =>
      axios.post(`${BaseUrl}user/support`, data, headers).then((res) => res.data).catch((err) => err.response.data),
    // Ticket
    createTicket: (headers, data) =>
      axios.post(`${BaseUrl}ticket`, data, headers)
        .then((res) => res.data).catch((err) => err.response.data),
    getTickets: (headers) =>
      axios.get(`${BaseUrl}tickets`, headers)
        .then((res) => res.data).catch((err) => err.response.data),
    sendMessage: (headers, ticketId, message) =>
      axios.patch(`${BaseUrl}ticket/message/${ticketId}`, message, headers)
        .then((res) => res.data).catch((err) => err.response.data),
    getMessages: (headers, ticketId) =>
      axios.get(`${BaseUrl}ticket/messages/${ticketId}`, headers)
        .then((res) => res.data).catch((err) => err.response.data),
    getRequests: (page, headers) =>
      axios.get(`${BaseUrl}user/requests?page=${page}`, headers)
        .then((res) => res.data).catch((err) => err.response.data),

    createRequest: (headers, data) =>
      axios.post(`${BaseUrl}request`, data, headers)
        .then((res) => res.data).catch((err) => err.response.data),
  },

};
