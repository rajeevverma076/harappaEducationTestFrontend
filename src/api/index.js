import axios from 'axios';
let client;
export default client = axios.create({
          baseURL:'http://127.0.0.1:3030/api/',
          headers: {
                'Authorization': 'Bearer '+localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
              }
  });
 