import axios from 'axios';

function uuidToBase64(uuid) {
	const hexToByteArray = (hex) => {
		const bytes = [];
		for (let i = 0; i < hex.length; i += 2) {
			bytes.push(parseInt(hex.substr(i, 2), 16));
		}
		return bytes;
	};

	const byteArrayToBase64 = (byteArray) => {
		const binaryString = String.fromCharCode.apply(null, byteArray);
		return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	};

	const uuidHex = uuid.replace(/-/g, '');
	const byteArray = hexToByteArray(uuidHex);
	return byteArrayToBase64(byteArray);
}

function base64ToUUID(base64) {
	const base64ToByteArray = (base64) => {
		const binaryString = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
		const byteArray = [];
		for (let i = 0; i < binaryString.length; i++) {
			byteArray.push(binaryString.charCodeAt(i));
		}
		return byteArray;
	};

	const byteArrayToHex = (byteArray) => {
		return byteArray.map((byte) => ('0' + byte.toString(16)).slice(-2)).join('');
	};

	const byteArray = base64ToByteArray(base64);
	const hexString = byteArrayToHex(byteArray);
	return [
		hexString.substring(0, 8),
		hexString.substring(8, 12),
		hexString.substring(12, 16),
		hexString.substring(16, 20),
		hexString.substring(20)
	].join('-');
}

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

export default instance;
