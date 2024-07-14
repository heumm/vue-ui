<template>
	<div>
		<div class="flex flex-col w-full gap-y-2">
			<h1 class="bg-primary py-2 px-3 font-bold text-white rounded">{{ article.title }}</h1>
			<div class="flex justify-between px-2 text-gray-500 font-semibold text-sm">
				<span>{{ article.authorName }}</span>
				<span>{{ formatDateTime(article.regDate) }}</span>
			</div>
			<hr />
			<div
				v-html="article.content"
				class="prose prose-sm prose-gray-500 sm:prose-base lg:prose-lg xl:prose-2xl p-4 min-h-[300px] prose-p:m-0 prose-hr:m-1 prose-hr:border-2 prose-img:m-0 before:prose-p:content-['\00a0']"></div>
			<div class="flex gap-x-1 justify-end">
				<button
					class="btn-sm bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark self-end"
					@click="$router.push(`/detail/todayqt/edit/${article.id}`)">
					수정하기
				</button>
				<button
					class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark self-end"
					@click="api.delete.article">
					삭제
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import httpRequest from '@/axios/axios.js';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { formatDateTime } from '@/util/format';

const route = useRoute();
const router = useRouter();
onMounted(() => {
	if (isValidUrl.value) {
		api.get.article();
	} else {
		router.push({ name: 'NotFound' });
	}
});

const article = ref({});
const isValidUrl = computed(() => /^[0-9]+$/.test(route.params.id));
const api = {
	get: {
		article: () => {
			httpRequest
				.get(`/api/v1/quiet-time/${route.params.id}`)
				.then((res) => {
					article.value = { ...res.data };
				})
				.catch((err) => {
					// console.log('error: ', err);
				});
		}
	},
	delete: {
		article: () => {
			if (!confirm('게시물을 삭제하시겠습니까?')) return;
			httpRequest
				.delete(`/api/v1/quiet-time/${article.value.id}`)
				.then((res) => {
					if (res.status === 204) {
						alert('게시글이 삭제되었습니다.');
						router.push('/detail/todayqt');
					}
				})
				.catch((err) => {});
		}
	}
};
</script>

<style lang="scss" scoped></style>
