import { CONST } from "@/Utilities/CONST";
import axios from "axios";

const userAPI = axios.create({
    baseURL: CONST.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  userAPI.interceptors.request.use(
    (config) => {
      return config;
    },
    function (err) {
      // handle error
      return Promise.reject(err);
    }
  );
  
  userAPI.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
    //   HandleAPIErrorPayload(error);
      return Promise.reject(error);
    }
  );

  export { userAPI };