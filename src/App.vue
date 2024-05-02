<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import PostEditView from '@/views/PostEditView.vue';
import FooterView from '@/views/FooterView.vue';
import AsideView from '@/views/AsideView.vue';
</script>

<template>
	<Header class="relative z-10"></Header>
	<RouterView class="grid grid-cols-8 gap-4 m-10 relative z-0 min-h-dvh"></RouterView>
	<FooterView class="bottom-0 bg-gray-900 h-60"></FooterView>
</template>
