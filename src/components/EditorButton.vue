<template>
	<button
		class="w-5 h-5 rounded-md hover:bg-zinc-900"
		@click="action"
		:title="title"
		:class="isActive() ? 'bg-zinc-900' : 'bg-zinc-500'">
		<!-- class바인딩 수정해야함(완료) -->
		<component class="fill-white" :is="heroIcons[toPascalCase(icon)]" />
	</button>
</template>

<script setup>
import * as heroIcons from '@heroicons/vue/20/solid';
// import { isActive } from '@tiptap/vue-3';

const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);
const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();

const props = defineProps({
	icon: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	action: {
		type: Function,
		required: true
	},

	isActive: {
		type: Function,
		default: null
	}
});
</script>
