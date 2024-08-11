<template>
	<div>
		<h1>Login Successful</h1>
		<p v-if="user">Welcome, {{ user.email }}</p>
		<p v-else>Loading...</p>
	</div>
</template>

<script setup>
import httpRequest from '@/axios/axios.js';
import { ref, onMounted } from 'vue';
import { useMemberStore } from '../stores/store';
import { useRouter, useRoute } from 'vue-router';

const getUrlParameter = (name) => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
};
const memberStore = useMemberStore();
const user = ref({});
const route = useRoute();
const router = useRouter();
onMounted(() => {
	memberStore.id = route.query.id;
	memberStore.name = route.query.name;
	window.history.replaceState(null, null, window.location.href);
	// window.location.href = '/';
	router.push({ path: '/', replace: true /*, query: { back: true }*/ });
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
