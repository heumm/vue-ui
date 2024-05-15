<template>
	<button
		class="active:bg-primary rounded-sm active:shadow-lg transition-colors duration-75 active:bg-opacity-70"
		@click="action($event)"
		:title="title"
		:class="isActive() ? 'bg-primary shadow' : ''">
		<!-- class바인딩 수정해야함(완료) -->

		<!-- <component v-if="icon" class="fill-primary" :is="heroIcons[toPascalCase(icon)]" />
		<span v-else class="text-white font-extrabold">{{ title }}</span> -->
		<svg-icon type="mdi" :path="path" class="flex flex-col items-center align-middle"></svg-icon>
	</button>
</template>

<script setup>
// import * as heroIcons from '@heroicons/vue/20/solid';
import SvgIcon from '@jamescoyle/vue-icon';

// import { isActive } from '@tiptap/vue-3';

// const toPascalCase = (text) => text.replace(/(^\w|-\w)/g, clearAndUpper);
// const clearAndUpper = (text) => text.replace(/-/, '').toUpperCase();

const props = defineProps({
	// icon: {
	// 	type: String
	// 	// required: true
	// },

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
	},
	path: {
		type: String
	}
});
</script>
