import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/'); 