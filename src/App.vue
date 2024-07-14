<template>
	<global-loading></global-loading>
	<header-view class="relative z-10"></header-view>
	<router-view class="grid grid-cols-12 gap-4 m-10 relative z-0 min-h-[500px]"></router-view>
	<footer-view class="bottom-0 h-60"></footer-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderView from '@/views/HeaderView.vue';
import FooterView from '@/views/FooterView.vue';
import { onMounted } from 'vue';
import httpRequest from '@/axios/axios.js';
// import { getCsrfToken } from '@/axios/axios.js';
import { useCsrfTokenStore } from './stores/store';
import GlobalLoading from '@/components/GlobalLoading.vue';

onMounted(() => {
	const csrfStore = useCsrfTokenStore();
	csrfStore.generateToken();
});

const api = {
	get: {
		initToken: () => {
			httpRequest
				.get('/api/v1')
				.then(() => {})
				.catch(() => {});
		}
	}
};
</script>
