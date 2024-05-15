import { createRouter, createWebHistory } from 'vue-router';
import PostEditView from '@/views/PostEditView.vue';
import HomeView from '@/views/HomeView.vue';
import VerseView from '@/views/VerseView.vue';
import TodayQTView from '@/views/today-qt/TodayQTView.vue';
import TodayQTEditView from '@/views/today-qt/TodayQTEditView.vue';
import BulletinListView from '@/views/bulletin/BulletinListView.vue';
import BulletinEditView from '@/views/bulletin/BulletinEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import DetailView from '@/views/DetailView.vue';
import BulletinDetailView from '@/views/bulletin/BulletinDetailView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView
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
					name: 'TodayQT',
					component: TodayQTView
				},
				{
					path: 'bulletin',
					// name: 'WeeklyBulletinList',
					// component: WeeklyBulletinListView,
					children: [
						{
							path: '',
							name: 'BulletinListView',
							component: BulletinListView
						},
						{
							path: 'new',
							name: 'BulletinEditView',
							component: BulletinEditView
						},
						{
							path: ':id',
							name: 'PostDetailView',
							component: BulletinDetailView,
							props: true
						}
					]
				},

				{
					path: 'todayqt/edit',
					name: 'TodayQTEditView',
					component: TodayQTEditView
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
