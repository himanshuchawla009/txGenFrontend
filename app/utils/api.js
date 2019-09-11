
import axios from 'axios';

 const BaseUrl = 'http://13.251.18.66:4000/api/v1/';

export default {
  
  transactions: {
    generateTransaction: (data) => axios
      .post(
        `${BaseUrl}transaction/generateTransaction`,
        data,
        {}
      )
      .then((res) => res.data)
      .catch((err) => err.response.data),
    getTransactions: (page,limit) =>
      axios.get(`${BaseUrl}transaction/allTransactions?page=${page}&limit=${limit}`)
       .then((res) => res.data).catch((err) => err.response.data),

      uploadToIpfs: (file) => axios
        .patch(`${BaseUrl}transaction/uploadToIpfs`, file, {})
        .then((res) => res.data)
        .catch((err) => err.response.data),
      uploadToAws: (file) => axios
        .patch(`${BaseUrl}transaction/uploadToAws`, file, {})
        .then((res) => res.data)
        .catch((err) => err.response.data),

  }
}