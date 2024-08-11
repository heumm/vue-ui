<template>
	<div>
		<div class="col-span-full min-h-dvh">
			<sm-carousel :images="images"></sm-carousel>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SmCarousel from '@/components/SmCarousel.vue';

const images = ref([
	'https://via.placeholder.com/800x400?text=Slide+1',
	'https://via.placeholder.com/800x400?text=Slide+2',
	'https://via.placeholder.com/800x400?text=Slide+3'
]);

const route = useRoute();
const router = useRouter();
// onMounted(() => {
if (route.query.back) {
	// router.go(-1);
}
// });
</script>
