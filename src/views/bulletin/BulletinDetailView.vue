<template>
	<div>
		<div class="flex flex-col w-full">
			<h3 class="text-center">{{ id }} 제목</h3>
			<div class="">내용</div>
			<div>
				<router-link
					to="/detail/bulletin"
					class="btn-sm bg-primary hover:bg-primary-over active:bg-primary-press">
					목록
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	id: String
});
</script>

<style lang="scss" scoped></style>
