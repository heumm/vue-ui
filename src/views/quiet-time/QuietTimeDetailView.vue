<template>
	<div>
		<div v-html="article.content"></div>
	</div>
</template>

<script setup>
import axios from '@/axios/axios.js';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
onMounted(() => {
	api.get.article();
});

const article = ref({});

const api = {
	get: {
		article: () => {
			axios
				.get(`/api/v1/quiet-time/${route.params.id}`)
				.then((res) => {
					article.value = { ...res.data };
				})
				.catch((err) => {
					// console.log('error: ', err);
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
