import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const menu = [
	{
		id: 1,
		name: '교회소식',
		uri: '/detail/posts',
		children: []
	},
	{
		id: 2,
		name: '예배말씀',
		uri: '/detail/verses',
		children: [
			{
				id: 1,
				name: '오늘의 묵상',
				uri: '/detail/todayqt'
			},
			{
				id: 2,
				name: '주보',
				uri: '/detail/bulletin'
			},
			{
				id: 2,
				name: '메뉴2',
				uri: '/detail/bulletin'
			},
			{
				id: 2,
				name: '메뉴3',
				uri: '/detail/bulletin'
			},
			{
				id: 2,
				name: '메뉴4',
				uri: '/detail/bulletin'
			},
			{
				id: 2,
				name: '메뉴5',
				uri: '/detail/bulletin'
			},
			{
				id: 2,
				name: '메뉴6',
				uri: '/detail/bulletin'
			}
		]
	}
];

export const useMemberStore = defineStore('member', () => {
	const id = ref();
	return { id };
});

export const useMenuStore = defineStore('menues', () => {
	const menuList = menu;
	const getMenus = computed(() => {
		return menuList;
	});
	const selectedMenuId = ref(0);
	const selectedMenu = computed(() => {
		for (const menu of menuList) {
			if (menu.id === selectedMenuId.value) {
				localStorage.setItem('selectedMenu', JSON.stringify(menu));

				return menu;
			} else if (selectedMenuId.value === 0) {
				return JSON.parse(localStorage.getItem('selectedMenu'));
			}
		}
	});

	return { selectedMenuId, getMenus, selectedMenu }; //getMenus를 포함한 객체를 반환하여 store를 정의한다.
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
