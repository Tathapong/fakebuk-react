//ทำให้ axios เรียกใช้แบบไม่ต้องกำหนด domain (axios.method('http://localhost:8008'))

import axios from "axios";
import { getAccesToken, removeAccesToken } from "../utilities/localstorage";
import { API_ENDPOINT_URL } from "./env";

// Config default base URL
axios.defaults.baseURL = API_ENDPOINT_URL;

// Config intercepter Request
// กำหนดให้ทุกการ Request ในกรณีที่มี Token  ให้ axios แนบ authorization ใน headers ด้วย Bearer + token
axios.interceptors.request.use(
  (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err); // คล้ายๆ การ Throw error
  }
);

// Config intercepter Response
// กำหนดให้เมื่อมี response เข้ามาโดยเป็น status 401 (Unauthenticated) ให้ทำการ remove access_token ใน LocalStorage และทำการ redirect ไปที่ /

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      removeAccesToken();
      window.location.replace("/");
    }

    return Promise.reject(err);
  }
);

export default axios;
