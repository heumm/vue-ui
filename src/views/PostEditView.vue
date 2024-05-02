<template>
	<div>
		<div class="w-10/12 flex-row items-center">
			<editor v-model="content" />
			<div>
				<h3>Content</h3>
				<pre><code>{{ content }}</code></pre>
			</div>
		</div>
	</div>
</template>

<script setup>
import Editor from '@/components/Editor.vue';
import { ref } from 'vue';

const content = ref('');
</script>
