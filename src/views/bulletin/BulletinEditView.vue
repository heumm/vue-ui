<template>
	<div>
		<div class="flex flex-col items-stretch gap-y-2 w-full">
			<div class="flex my-2 gap-x-2">
				<!-- <label for="title">제목:</label> -->
				<input
					class="grow px-3 py-1 outline-none border rounded-sm placeholder:text-sm"
					id="title"
					v-model="qtTitle"
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
				<button class="btn-sm bg-primary hover:bg-primary-over active:bg-primary-press">
					작성
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import Editor from '@/components/Editor.vue';
import MyTiptapEditor from '@/components/MyTiptapEditor.vue';
import { ref } from 'vue';
const qtTitle = ref('');

const contents = ref('');
</script>

<style lang="scss" scoped></style>
