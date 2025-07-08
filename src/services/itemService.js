import axios from '@/services/httpRequest';
axios.defaults.baseURL = '/api/v1';

export const getItem = () => {
    return axios.Axios.get('/item').catch(e => e.response);
}