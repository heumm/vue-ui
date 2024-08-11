<template>
	<div class="relative w-full h-[300px] overflow-hidden">
		<div
			class="flex transition-transform duration-500"
			:style="{ transform: `translateX(-${currentIndex * 100}%)` }">
			<div
				class="min-w-full box-border h-full flex items-center justify-center bg-gray-100"
				v-for="(image, index) in images"
				:key="index">
				<img :src="image" :alt="'Image ' + index" class="w-full h-[300px] object-cover" />
			</div>
		</div>
		<button
			@click="prev"
			class="absolute top-1/2 transform -translate-y-1/2 left-4 shadow opacity-70 bg-gray-800 text-white border-none text-2xl px-3 cursor-pointer user-select-none z-10">
			‹
		</button>
		<button
			@click="next"
			class="absolute top-1/2 transform -translate-y-1/2 right-4 shadow opacity-70 bg-gray-800 text-white border-none text-2xl px-3 cursor-pointer user-select-none z-10">
			›
		</button>
		<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
			<span
				v-for="(image, index) in images"
				:key="index"
				@click="goToSlide(index)"
				class="w-2 h-2 opacity-80 shadow rounded-full cursor-pointer"
				:class="{ 'bg-gray-500': index === currentIndex, 'bg-white': index !== currentIndex }">
			</span>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
	images: {
		type: Array,
		required: true
	}
});

const currentIndex = ref(0);

const prev = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	} else {
		currentIndex.value = props.images.length - 1;
	}
	resetInterval();
};

const next = () => {
	if (currentIndex.value < props.images.length - 1) {
		currentIndex.value++;
	} else {
		currentIndex.value = 0;
	}
	resetInterval();
};

const goToSlide = (index) => {
	currentIndex.value = index;
	resetInterval();
};

let interval;

const resetInterval = () => {
	clearInterval(interval);
	setCarouselInterval();
};

const setCarouselInterval = () => {
	interval = setInterval(next, 3000);
};

onMounted(() => {
	setCarouselInterval();
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<style scoped></style>
