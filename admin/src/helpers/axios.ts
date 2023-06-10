import axios from 'axios';
export const baseURL = 'http://localhost:6655';
// export const baseURL = 'https://el-mithaq.net:4999';
// export const baseURL = window.location.origin;
export const baseUploadURL = baseURL + '/uploads/';
const admin = localStorage.ujclassAdmin ? JSON.parse(localStorage.ujclassAdmin) : '';

export const HTTP = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: {
    Authorization: `Bearer ${admin?.token} `,
  },
});
