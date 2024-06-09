<template>
	<header-view class="bg-green-50 relative z-10"></header-view>
	<router-view class="grid grid-cols-12 gap-4 m-10 relative z-0 min-h-[500px]"></router-view>
	<footer-view class="bg-slate-100 bottom-0 h-60"></footer-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HeaderView from '@/views/HeaderView.vue';
import FooterView from '@/views/FooterView.vue';

const api = {};
</script>
