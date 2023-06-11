import axios from "axios";

const HTTPClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:true
  });


export default HTTPClient;