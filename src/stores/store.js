import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/axios/axios.js';

export const useMemberStore = defineStore('member', () => {
	const id = ref();
	return { id };
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
				// localStorage.setItem('selectedMenu', JSON.stringify(menu));
				// console.log(JSON.parse(localStorage.getItem('selectedMenu')));
				return menu;
			} else if (selectedMenuId.value === 0) {
				// return JSON.parse(localStorage.getItem('selectedMenu'));
			}
		}
	});
	const fetchMenus = async () => {
		try {
			const res = await axios.get('/api/v1/menu');
			menuList.value = res.data;
		} catch (err) {
			console.error('Failed to fetch menus:', err);
		}
	};
	return { selectedMenuId, getMenus, selectedMenu, fetchMenus }; //getMenus를 포함한 객체를 반환하여 store를 정의한다.
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
	return { isMounted };
});
