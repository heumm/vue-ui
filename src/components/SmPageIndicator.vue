<template>
	<div class="flex justify-center mt-4">
		<sm-button
			size="xs"
			color="primary"
			:disabled="isFirstPage"
			class="mx-1"
			@click="
				currentPage = Math.max(1, startPageIndex - indicatorSize);
				$emit('prev');
			"
			>이전</sm-button
		>
		<button
			v-for="pageIndex in pageArray"
			:key="pageIndex"
			class="btn-xs mx-1 hover:bg-secondary-dark"
			:class="pageIndex === currentPage ? 'bg-secondary-dark' : 'bg-secondary'"
			:disabled="pageIndex === currentPage"
			@click="
				currentPage = pageIndex;
				$emit('clickIndex');
			">
			{{ pageIndex }}
		</button>
		<sm-button
			size="xs"
			color="primary"
			:disabled="isLastPage"
			class="mx-1"
			@click="
				currentPage = Math.min(totalPageNum, startPageIndex + indicatorSize);
				$emit('next');
			"
			>다음</sm-button
		>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import SmButton from '@/components/buttons/SmButton.vue';
const props = defineProps({
	// active: {
	// 	type: Number,
	// 	required: true
	// },
	pageSize: {
		type: Number,
		required: true
	},
	indicatorSize: {
		type: Number,
		required: true
	},
	totalCount: {
		type: Number,
		required: true
	},
	modelValue: {
		type: Number,
		required: true
	}
});

const emit = defineEmits(['next', 'prev', 'clickIndex', 'update:modelValue']);
const currentPage = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
});
const totalPageNum = computed(() => Math.ceil(props.totalCount / props.pageSize));
const startPageIndex = computed(
	() => Math.floor((currentPage.value - 1) / props.indicatorSize) * props.indicatorSize + 1
);
const endPageIndex = computed(() => startPageIndex.value + props.indicatorSize - 1);
const isFirstPage = computed(() => endPageIndex.value <= props.indicatorSize);
const isLastPage = computed(() => totalPageNum.value - startPageIndex.value < props.indicatorSize);
const pageArray = computed(() => {
	const arr = [];
	for (let i = startPageIndex.value; i <= Math.min(totalPageNum.value, endPageIndex.value); i++) {
		arr.push(i);
	}
	return arr;
});
</script>

<style lang="scss" scoped></style>
