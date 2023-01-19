import axios from "axios";

export const updateUser = (input) => axios.patch("/users", input);
