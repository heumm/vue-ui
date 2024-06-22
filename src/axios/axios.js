import axios from 'axios';
import { useLoginFormStore, useMemberStore } from '@/stores/store';

//Axios 인스턴스 생성
const instance = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true
});

//CSRF토큰을 쿠키에서 읽어오기
export const getCsrfToken = () => {
	const value = `; ${document.cookie}`;
	const parts = value.split('; XSRF-TOKEN=');
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
};

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

// 재발급 중복 방지 플래그
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve();
		}
	});

	failedQueue = [];
};

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.log('error caused: ', error);
		const originalRequest = error.config;
		if (error.response) {
			if (
				(error.response.data.cause === 'ACCESS_TOKEN_EXPIRED' ||
					error.response.data.cause === 'ACCESS_TOKEN_BLANK') &&
				!originalRequest._retry
			) {
				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then(() => {
							return instance(originalRequest);
						})
						.catch((err) => {
							return Promise.reject(err);
						});
				}

				originalRequest._retry = true;
				isRefreshing = true;
				const memberStore = useMemberStore();
				return new Promise((resolve, reject) => {
					// refresh 토큰을 사용하여 access 토큰을 재발급받는 API 호출
					instance
						.post('/api/v1/member/refresh', { memberId: memberStore.id })
						.then(() => {
							processQueue(null);
							resolve(instance(originalRequest));
						})
						.catch((err) => {
							processQueue(err);
							reject(err);
						})
						.finally(() => {
							isRefreshing = false;
						});
				});
			} else if (
				error.response.data.cause === 'REFRESH_TOKEN_EXPIRED' ||
				error.response.data.cause === 'REFRESH_TOKEN_BLANK'
			) {
				//서버에서 401 UNAUTHORIZED응답 시
				const memberStore = useMemberStore();
				const loginFormStore = useLoginFormStore();
				memberStore.logout(); //로그아웃 처리
				if (!loginFormStore.isMounted) {
					loginFormStore.open();
				}
			}
		}
		return Promise.reject(error);
	}
);

export default instance;
