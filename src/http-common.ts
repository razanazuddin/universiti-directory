import axios from 'axios';

export default axios.create({
  baseURL: 'http://universities.hipolabs.com',
  headers: {
    'Content-type': 'application/json'
  }
});
