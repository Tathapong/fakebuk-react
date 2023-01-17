import axios from "../config/axios";
import { getAccesToken } from "../utilities/localstorage";

export const register = ({ firstName, lastName, emailOrMobile, password, confirmPassword }) =>
  axios.post("/auth/register", { firstName, lastName, emailOrMobile, password, confirmPassword });
export const login = ({ emailOrMobile, password }) => axios.post("/auth/login", { emailOrMobile, password });

export const getMe = () => axios.get("/auth/me");
