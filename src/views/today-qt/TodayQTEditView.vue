<template>
	<div>
		<div class="flex flex-col items-stretch gap-y-2">
			<div class="flex my-2 gap-x-2">
				<!-- <label for="title">제목:</label> -->
				<input
					class="grow px-3 py-1 outline-none border rounded-sm placeholder:text-sm"
					id="title"
					v-model="qtTitle"
					placeholder="제목을 입력해주세요." />
			</div>

			<div class="flex flex-col gap-y-2">
				<!-- <editor v-model="content" /> -->
				<div class="flex flex-col">
					<editor id="container" v-model="contents" class="min-h-80"></editor>
				</div>
				<!-- {{ content }} -->
				<!-- <div> -->
				<div class="flex flex-row-reverse">
					<button class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark">
						작성
					</button>
				</div>

				<h3>Content</h3>
				<pre><code>{{ contents }}</code></pre>
				<!-- </div> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import Editor from '@/components/Editor.vue';
import { ref } from 'vue';
const qtTitle = ref('');

const contents = ref('');
</script>

<style lang="scss" scoped></style>
