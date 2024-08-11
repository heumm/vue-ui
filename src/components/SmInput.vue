<template>
	<label v-if="label" :for="id" class="text-gray-900">{{ label }}</label>
	<input
		:id="id"
		v-model="value"
		type="text"
		class="outline-none border rounded placeholder:text-gray-400"
		:class="generateColor(color) + setSize(size)"
		:placeholder="placeholder"
		:maxlength="maxlength" />
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
	maxlength: {
		type: Number
	},
	color: {
		type: String,
		default: 'primary'
	},
	label: {
		type: String
	},
	placeholder: {
		type: String,
		required: false
	},
	modelValue: {
		type: String,
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
			return ' text-xs font-normal py-1 px-2 duration-150';
		case 'md':
			return ' text-sm font-semibold py-[0.3rem] px-[0.6rem] duration-150';
		case 'lg':
			return ' text-lg font-bold py-3 px-3 duration-200';
	}
};
</script>

<style scoped></style>
