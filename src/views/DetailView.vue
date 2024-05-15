<template>
	<div>
		<aside-view class="col-span-2 bg-blue-200 p-3 rounded-md">aside입니다</aside-view>
		<router-view class="bg-amber-50 rounded-md col-start-3 col-span-10 flex justify-center p-3" />
	</div>
</template>

<script setup>
import AsideView from '@/views/AsideView.vue';
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped></style>
