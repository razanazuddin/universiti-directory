import http from '../http-common';

const getAll = () => {
  return http.get('/search?name=');
};

const search = (query: string) => {
  return http.get(`/search?name=${query}&country=${query}`);
};

const UniversityService = {
  getAll,
  search
};

export default UniversityService;
