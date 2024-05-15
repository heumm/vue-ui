<template>
	<div>
		<div class="flex flex-col bg-amber-50">
			<!-- <editor v-model="content" /> -->
			<editor id="container" class="min-h-80"></editor>
			<!-- <div> -->
			<!-- <h3>Content</h3>
				<pre><code>{{ content }}</code></pre> -->
			<!-- </div> -->
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Editor from '@/components/Editor.vue';
// import { quillEditor, Quill } from 'vue3-quill';
// Quill.register('@/components/Editor', Editor);

const content = ref('');
</script>
