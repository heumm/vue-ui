<template>
	<div v-if="loadingStore.isLoading" class="loading-overlay">Loading...</div>
</template>

<script setup>
import { useLoadingStore } from '@/stores/store.js';

const loadingStore = useLoadingStore();
// const isLoading = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}
</style>
