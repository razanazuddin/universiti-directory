import http from '../http-common';
import IUniversityData from '../types/University';

const getAll = () => {
  return http.get('/search?name=');
};

const create = (data: IUniversityData) => {
  return http.post('/universities', data);
};

const search = (query: string) => {
  return http.get(`/search?name=${query}&country=${query}`);
};

const UniversityService = {
  getAll,
  create,
  search
};

export default UniversityService;
