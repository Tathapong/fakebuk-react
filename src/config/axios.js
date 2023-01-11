//ทำให้ axios เรียกใช้แบบไม่ต้องกำหนด domain (axios.method('http://localhost:8008'))

import axios from "axios";
import { API_ENDPOINT_URL } from "./env";

axios.defaults.baseURL = API_ENDPOINT_URL;

export default axios;
