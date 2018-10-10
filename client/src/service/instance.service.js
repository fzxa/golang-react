import axios from 'axios'

let Instance = axios.create({
     baseURL: 'https://developers.nebulas.io',
    //baseURL:"http://localhost:8080",
    timeout: 3500
});
export default Instance;