import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callFetchListUser = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put(`api/v1/user`, { _id, fullName, phone });
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const callCreateAUser = (userData) => {
  return axios.post(`/api/v1/user`, userData);
};

export const callBulkCreateUser = (userData) => {
  return axios.post(`/api/v1/user/bulk-create`, userData);
};

export const callFetchListBook = (bookData) => {
  return axios.post("/api/v1/book", bookData);
};
