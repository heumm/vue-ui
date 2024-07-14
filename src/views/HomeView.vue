<template>
	<div>
		<div class="col-span-full min-h-dvh">메인 페이지입니다.</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
// onMounted(() => {
if (route.query.back) {
	router.go(-1);
}
// });
</script>
