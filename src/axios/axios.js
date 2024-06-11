import axios from 'axios';
import { useMemberStore } from '@/stores/store';

//Axios 인스턴스 생성
const instance = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true
});

//CSRF토큰을 쿠키에서 읽어오기
function getCsrfToken() {
	const value = `; ${document.cookie}`;
	const parts = value.split('; XSRF-TOKEN=');
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

//요청 인터셉터
instance.interceptors.request.use(
	async (config) => {
		const csrfToken = getCsrfToken();
		if (csrfToken) {
			config.headers['X-XSRF-TOKEN'] = csrfToken;
		}
		// console.log('Request Header:', config.headers);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			//서버에서 401 UNAUTHORIZED응답 시
			const memberStore = useMemberStore();
			memberStore.logout(); //로그아웃 처리
		}
		return Promise.reject(error);
	}
);

export default instance;
