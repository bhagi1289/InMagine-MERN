import axios from "axios";

axios.defaults.withCredentials = true;

const HTTPClient = axios.create({
    baseURL: 'https://inmagine-backend.onrender.com',//'http://localhost:3000',
  });


export default HTTPClient;