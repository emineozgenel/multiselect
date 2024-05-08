import { TGetApiParams } from 'types';
import api from './axiosInstance';

const getCharacters = (params: TGetApiParams) => api.get('/character/', { params });

const requests = {
  getCharacters,
};

export default requests;
