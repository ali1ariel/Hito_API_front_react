import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.0.0.0:4000/api/persons'
})

export default api;