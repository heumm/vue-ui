<template>
	<div>
		<div class="flex flex-col items-stretch gap-y-2 w-full">
			<div class="flex my-2 gap-x-2">
				<input
					class="grow px-3 py-1 outline-none border rounded-sm placeholder:text-sm"
					id="title"
					v-model="article.title"
					placeholder="제목을 입력해주세요." />
			</div>

			<div class="flex flex-col gap-y-2 w-full border">
				<div class="flex flex-col divide-y">
					<my-tiptap-editor v-model="article.content"></my-tiptap-editor>
				</div>
			</div>
			<div class="flex flex-row-reverse">
				<button
					v-if="isModify"
					class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark"
					@click="api.put.todayQt">
					수정
				</button>
				<button
					v-else
					class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark"
					@click="api.post.todayQt">
					작성
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import MyTiptapEditor from '@/components/MyTiptapEditor.vue';
import { computed, onMounted, ref, watch } from 'vue';
import httpRequest from '@/axios/axios.js';
import { useLoginFormStore, useMemberStore } from '@/stores/store';
// import router from '@/router';
import { useRoute, useRouter } from 'vue-router';

// const articleId = ref();
// const title = ref('');
// const contents = ref('');

const article = ref({ title: '', content: '' });

const memberStore = useMemberStore();
const router = useRouter();
const route = useRoute();
const isModify = route.params.id !== undefined;
onMounted(() => {
	if (isModify) {
		// articleId.value = route.params.id;
		if (validation.url.value) {
			api.get.article(route.params.id);
		} else {
			router.push({ name: 'NotFound' });
		}
	}
});

const api = {
	get: {
		article: (id) => {
			httpRequest
				.get(`/api/v1/quiet-time/${id}`)
				.then((res) => {
					article.value = { ...res.data };
				})
				.catch((err) => {
					alert(err.response.data.message);
					router.back();
				});
		}
	},
	post: {
		todayQt: () => {
			if (!validation.form()) return false;
			httpRequest
				.post('/api/v1/quiet-time/new', {
					title: article.value.title,
					content: article.value.content
					// authorId: memberStore.id
				})
				.then((res) => {
					alert('게시글 등록 완료');
					router.push('/detail/todayqt');
				})
				.catch((err) => {
					// console.log('error: ', err);
				});
		}
	},
	put: {
		todayQt: () => {
			httpRequest
				.put(`/api/v1/quiet-time/${article.value.id}`, {
					...article.value
					// title: article.value.title,
					// content: article.value.content
				})
				.then((res) => {
					alert('게시글 수정 완료');
					router.push(`/detail/todayqt/${article.value.id}`);
				})
				.catch((err) => {});
		}
	}
};

const validation = {
	form: () => {
		let isValid = false;
		if (!memberStore.isLoggedIn) {
			alert('로그인이 필요합니다!');
			const loginFormStore = useLoginFormStore();
			loginFormStore.open();
		} else if (article.value.title === '') {
			alert('제목을 입력해주세요.');
		} else if (article.value.content === '') {
			alert('내용을 입력해주세요.');
		} else {
			isValid = true;
		}
		return isValid;
	},
	url: computed(() => /^[0-9]+$/.test(route.params.id))
};

// watch(
// 	() => article.value.content,
// 	(newVal, oldVal) => {
// 		console.log('newValue: ', newVal);
// 		const base64Images = newVal.match(/<img src="data:image\/[^;]+;base64[^"]+"[^>]*>/g);
// 		if (!base64Images) {
// 			console.log('No images found');
// 			return;
// 		}
// 	}
// );
</script>

<style lang="scss" scoped></style>
