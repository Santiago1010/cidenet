import axios from 'axios'

const api = axios.create({
	baseURL: 'https://ops.enerbit.dev/learning/api/v1/meters',
});

export default api;