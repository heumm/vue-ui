<template>
	<div>
		<div class="flex flex-col items-stretch gap-y-2 w-full">
			<div class="flex my-2 gap-x-2">
				<!-- <label for="title">제목:</label> -->
				<input
					class="grow px-3 py-1 outline-none border rounded-sm placeholder:text-sm"
					id="title"
					v-model="title"
					placeholder="제목을 입력해주세요." />
			</div>

			<div class="flex flex-col gap-y-2 w-full border">
				<!-- <editor v-model="content" /> -->
				<div class="flex flex-col divide-y">
					<my-tiptap-editor v-model="contents"></my-tiptap-editor>
				</div>
				<!-- {{ content }} -->
				<!-- <div> -->

				<!-- <h3>Content</h3>
						<pre><code>{{ contents }}</code></pre> -->
				<!-- </div> -->
			</div>
			<div class="flex flex-row-reverse">
				<button
					class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark"
					@click="api.post.todayQt">
					작성
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import Editor from '@/components/Editor.vue';
import MyTiptapEditor from '@/components/MyTiptapEditor.vue';
import { onMounted, ref } from 'vue';
import axios from '@/axios/axios.js';
import { useMemberStore } from '@/stores/store';
import router from '@/router';

const title = ref('');
const contents = ref('');
const memberStore = useMemberStore();

// onMounted(() => {
// 	memberStore.
// })

const api = {
	post: {
		todayQt: () => {
			if (!validation.form()) return false;
			axios
				.post('/api/v1/quiet-time', {
					title: title.value,
					content: contents.value,
					authorId: memberStore.id
				})
				.then((res) => {
					alert('게시글 등록 완료');
					router.push('/detail/todayqt');
				})
				.catch((err) => {
					console.log('error: ', err);
				});
		}
	}
};

const validation = {
	form: () => {
		let isValid = false;
		if (title.value === '') {
			alert('제목을 입력해주세요.');
		} else if (contents.value === '') {
			alert('내용을 입력해주세요.');
		} else if (!memberStore.id) {
			alert('로그인이 필요합니다!');
		} else {
			isValid = true;
		}
		return isValid;
	}
};
</script>

<style lang="scss" scoped></style>
