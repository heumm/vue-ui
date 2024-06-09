import { createRouter, createWebHistory } from 'vue-router';
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

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		// 항상 화면 상단으로 스크롤
		return { top: 0 };
	},
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
							path: 'new',
							name: 'QuietTimeEdit',
							component: QuietTimeEditView
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
					// name: 'WeeklyBulletinList',
					// component: WeeklyBulletinListView,
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

export default router;
