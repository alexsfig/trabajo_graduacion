import axios from 'axios';
// Define custom base url to connect to API
//const BASE_URL = process.env.BASE_URL;
//const BASE_URL = "http://192.168.1.96:8080/";
//const BASE_URL = "http://alexsfig.com:8080/";
const BASE_URL = process.env.BASE_URL;
const UPLOAD_URL = process.env.UPLOAD_URL;
axios.interceptors.response.use(function (response) {
    console.log(response)
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
// Create Base connection
export const HTTP = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Pass access token in each request
        'authorization': localStorage.authorization
    },
    // Add validation to status request, used in promises
    validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
})

export const UPLOAD = axios.create({
    baseURL: UPLOAD_URL,
    headers: {
        'Content-Type': 'application/json',
        // Pass access token in each request
        'x-access-token': localStorage.access_token
    },
    // Add validation to status request, used in promises
    validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
})
