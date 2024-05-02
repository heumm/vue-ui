<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import PostEditView from '@/views/PostEditView.vue';
import FooterView from '@/views/FooterView.vue';
import AsideView from '@/views/AsideView.vue';
</script>

<template>
	<Header class="relative z-10"></Header>
	<div class="grid grid-cols-8 gap-4 m-10 relative z-0">
		<AsideView class="col-span-2 bg-slate-500 p-3 rounded-md">aside입니다</AsideView>
		<div class="col-start-3 col-span-6">
			<RouterView
				class="bg-amber-700 rounded-md col-start-3 col-span-6 flex justify-center min-h-dvh p-3" />
		</div>
	</div>
	<FooterView class="bottom-0 bg-gray-900 h-60"></FooterView>
</template>
