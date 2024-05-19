<template>
	<button
		class="active:bg-primary rounded-sm active:shadow-inner transition-colors duration-75 active:bg-opacity-70 relative"
		@click="action($event)"
		@mouseenter="displayTooltip = true"
		@mouseleave="displayTooltip = false"
		:title="title"
		:class="isActive() ? 'bg-primary shadow-lg' : ''">
		<!-- class바인딩 수정해야함(완료) -->

		<!-- <component v-if="icon" class="fill-primary" :is="heroIcons[toPascalCase(icon)]" />
		<span v-else class="text-white font-extrabold">{{ title }}</span> -->
		<svg-icon type="mdi" :path="path" class="flex flex-col items-center align-middle"></svg-icon>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95">
			<div
				v-if="displayTooltip"
				class="bg-gray absolute px-1 my-1 bg-opacity-50 rounded shadow text-nowrap text-xs text-center">
				{{ title }}
			</div>
		</transition>
	</button>
</template>

<script setup>
// import * as heroIcons from '@heroicons/vue/20/solid';
import SvgIcon from '@jamescoyle/vue-icon';
import { ref } from 'vue';

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

const displayTooltip = ref(false);
</script>
