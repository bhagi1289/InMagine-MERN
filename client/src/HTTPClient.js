import axios from "axios";

const HTTPClient = axios.create({
    baseURL: 'https://inmagine-backend.onrender.com',
    withCredentials:true
  });


export default HTTPClient;