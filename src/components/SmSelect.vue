<template>
	<select
		:id="id"
		v-model="value"
		class="outline-none border rounded"
		:class="generateColor(color) + setSize(size)">
		<option v-for="option in options" :key="option.value" :value="option.value">
			{{ option.text }}
		</option>
	</select>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
	id: {
		type: String
	},
	size: {
		type: String,
		default: 'md'
	},
	color: {
		type: String,
		default: 'primary'
	},
	modelValue: {
		type: String,
		required: true
	},
	options: {
		type: Array,
		required: true
	}
});

const emit = defineEmits(['update:modelValue']);
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
});

const generateColor = (color) => {
	return 'focus:border-' + color;
};

const setSize = (size) => {
	switch (size) {
		case 'sm':
			return ' text-xs font-normal py-1 px-2 duration-150 shadow-sm';
		case 'md':
			return ' text-sm font-semibold py-[0.3rem] px-[0.6rem] duration-150 shadow';
		case 'lg':
			return ' text-lg font-bold py-3 px-3 duration-200 shadow';
	}
};
</script>

<style lang="scss" scoped></style>
