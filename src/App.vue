<template>
	<header-view class="bg-green-50 relative z-10"></header-view>
	<router-view class="grid grid-cols-12 gap-4 m-10 relative z-0 min-h-[500px]"></router-view>
	<footer-view class="bg-slate-100 bottom-0 h-60"></footer-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderView from '@/views/HeaderView.vue';
import FooterView from '@/views/FooterView.vue';
import { onMounted } from 'vue';
import axios from '@/axios/axios.js';
import { getCsrfToken } from '@/axios/axios.js';

onMounted(() => {
	if (getCsrfToken() === null) {
		api.get.initToken();
	}
});

const api = {
	get: {
		initToken: () => {
			axios
				.get('/api/v1')
				.then(() => {})
				.catch(() => {});
		}
	}
};
</script>
