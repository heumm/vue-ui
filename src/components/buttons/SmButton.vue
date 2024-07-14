<template>
	<button
		class="text-white rounded transition-colors focus:outline-none disabled:bg-disabled"
		:class="generateColor(color) + setSize(size)"
		:disabled="disabled"
		@click="$emit('click')">
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	color: {
		type: String,
		default: 'primary'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	size: {
		type: String,
		default: 'sm'
	}
});

const generateColor = (color) => {
	return 'bg-' + color + ' hover:bg-' + color + '-dark active:bg-' + color + '-extradark';
};

const setSize = (size) => {
	switch (size) {
		case 'xs':
			return ' text-xs font-normal py-1 px-2 duration-100';
		case 'sm':
			return ' text-sm font-semibold py-[0.3rem] px-[0.7rem] duration-150';
		case 'lg':
			return ' font-bold py-3 px-6 duration-200';
	}
};

const emit = defineEmits(['click']);
</script>

<style lang="scss"></style>
