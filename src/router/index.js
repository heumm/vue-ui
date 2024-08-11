import { createRouter, createWebHistory } from 'vue-router';
import { useLoginFormStore, useMemberStore } from '@/stores/store';
import PostEditView from '@/views/PostEditView.vue';
import HomeView from '@/views/HomeView.vue';
import VerseView from '@/views/VerseView.vue';
import QuietTimeListView from '@/views/quiet-time/QuietTimeListView.vue';
import QuietTimeEditView from '@/views/quiet-time/QuietTimeEditView.vue';
import QuietTimeDetailView from '@/views/quiet-time/QuietTimeDetailView.vue';
import BulletinListView from '@/views/bulletin/BulletinListView.vue';
import BulletinEditView from '@/views/bulletin/BulletinEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import DetailView from '@/views/DetailView.vue';
import BulletinDetailView from '@/views/bulletin/BulletinDetailView.vue';
import MemberLoginView from '@/views/member/MemberLoginView.vue';
import MemberJoinView from '@/views/member/MemberJoinView.vue';
import OAuth2Success from '@/components/OAuth2Success.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		// 항상 화면 상단으로 스크롤
		return { top: 0 };
	},
	//todo: addRoute를 활용해 동적으로 routes추가
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView
		},
		{
			path: '/login',
			name: 'MemberLogin',
			component: MemberLoginView
		},
		{
			path: '/oauth2success',
			name: 'OAuth2Success',
			component: OAuth2Success
		},
		{
			path: '/join',
			name: 'MemberJoin',
			component: MemberJoinView
		},
		{
			path: '/detail',
			name: 'Detail',
			component: DetailView,
			children: [
				{
					path: 'posts',
					name: 'PostEdit',
					component: PostEditView
				},
				{
					path: 'verses',
					name: 'Verse',
					component: VerseView
				},
				{
					path: 'todayqt',
					children: [
						{
							path: '',
							name: 'QuietTimeList',
							component: QuietTimeListView
						},
						{
							path: 'edit',
							children: [
								{
									path: '',
									name: 'QuietTimeNew',
									component: QuietTimeEditView,
									meta: { requiresAuth: true }
								},
								{
									path: ':id',
									name: 'QuietTimeModify',
									component: QuietTimeEditView,
									meta: { requiresAuth: true }
								}
							]
						},
						{
							path: ':id',
							name: 'QuietTimeDetail',
							component: QuietTimeDetailView,
							props: true
						}
					]
				},
				{
					path: 'bulletin',
					children: [
						{
							path: '',
							name: 'BulletinList',
							component: BulletinListView
						},
						{
							path: 'new',
							name: 'BulletinEdit',
							component: BulletinEditView
						},
						{
							path: ':id',
							name: 'PostDetail',
							component: BulletinDetailView,
							props: true
						}
					]
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFoundView
		}
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue')
		// }
	]
});

router.beforeEach((to, from, next) => {
	const memberStore = useMemberStore();
	const loginFormStore = useLoginFormStore();
	const isLoggedIn = memberStore.isLoggedIn; // 사용자 인증 상태 확인

	if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
		// 인증되지 않은 사용자는 로그인 모달 오픈
		alert('로그인이 필요합니다.');
		loginFormStore.open();
	} else {
		next(); // 인증된 사용자는 요청한 페이지로 이동
	}
});

export default router;
