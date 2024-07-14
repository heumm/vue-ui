import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import httpRequest from '@/axios/axios.js';

export const useMemberStore = defineStore('member', () => {
	const id = ref(null);
	const name = ref(null);
	const logout = () => {
		alert('로그아웃');
		httpRequest
			.post('/api/v1/member/logout')
			.then((res) => {})
			.catch((err) => {})
			.finally(() => {
				localStorage.removeItem('member');
				id.value = null;
				name.value = null;
			});
	};
	const isLoggedIn = computed(() => {
		return id.value !== null;
	});

	return { id, name, logout, isLoggedIn };
});

export const useMenuStore = defineStore('menus', () => {
	const menuList = ref([]);
	const getMenus = computed(() => {
		return menuList.value;
	});
	const selectedMenuId = ref(0);
	const selectedMenu = computed(() => {
		for (const menu of menuList.value) {
			if (menu.id === selectedMenuId.value) {
				return menu;
			}
		}
	});
	const fetchMenus = async () => {
		try {
			if (menuList.value.length > 0) return;
			const res = await httpRequest.get('/api/v1/menu');
			menuList.value = res.data;
		} catch (err) {
			// console.log('Failed to fetch menus:', err);
		}
	};
	return { menuList, selectedMenuId, getMenus, selectedMenu, fetchMenus }; //getMenus를 포함한 객체를 반환하여 store를 정의한다.
});

export const useBoardLayoutStore = defineStore('boardLayouts', () => {
	const layout = ref('table');
	const getLayout = computed(() => {
		return layout;
	});
	function setLayout(value) {
		layout.value = value;
	}

	return { getLayout, setLayout };
});

export const useLoginFormStore = defineStore('loginForm', () => {
	const isMounted = ref(false);
	const openLoginModal = ref(false);
	const close = () => {
		openLoginModal.value = false;
	};
	const open = () => {
		openLoginModal.value = true;
	};
	const isOpen = computed(() => openLoginModal.value);
	return { isMounted, open, close, isOpen };
});

export const useCsrfTokenStore = defineStore('csrfToken', () => {
	//CSRF토큰을 쿠키에서 읽어오기
	const getCsrfToken = () => {
		const value = `; ${document.cookie}`;
		const parts = value.split('; XSRF-TOKEN=');
		if (parts.length === 2) {
			const token = parts.pop().split(';').shift();
			return token && token.trim() ? token : null; // 비어있는지 체크
		}
		return null;
	};

	const generateToken = () => {
		if (getCsrfToken() === null) {
			httpRequest.get('/api/v1');
		}
	};
	return { getCsrfToken, generateToken };
});

//로딩ui용 상태 저장소
export const useLoadingStore = defineStore('loading', () => {
	const isLoading = ref(false);
	const setLoading = (loading) => (isLoading.value = loading);
	// state: () => ({
	// 	isLoading: false
	// }),
	// actions: {
	// 	setLoading(loading) {
	// 		this.isLoading = loading;
	// 	}
	// }
	return { isLoading, setLoading };
});
