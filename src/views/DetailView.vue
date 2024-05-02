<template>
	<div>
		<AsideView class="col-span-2 bg-slate-500 p-3 rounded-md">aside입니다</AsideView>
		<RouterView class="bg-amber-700 rounded-md col-start-3 col-span-6 flex justify-center p-3" />
	</div>
</template>

<script setup>
import AsideView from '@/views/AsideView.vue';
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped></style>
