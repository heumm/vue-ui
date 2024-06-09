<template>
	<header>
		<nav class="mx-auto flex max-w-5xl items-center justify-between p-4 sm:px-8">
			<div class="flex sm:flex-1">
				<router-link to="/" class="-m-1.5 p-1.5">
					<span class="sr-only">Your Company</span>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="" />
				</router-link>
			</div>

			<div class="sm:flex sm:gap-x-12">
				<div v-for="menu in menuStore.getMenus" :key="menu.id">
					<!-- children있는 메뉴 -->
					<div
						v-if="menu.children.length > 0"
						@mouseenter="dropdownVerse = true"
						@mouseleave="dropdownVerse = false"
						class="inline-block relative text-left">
						<div class="flex my-2">
							<button class="flex gap-x-1 text-sm font-semibold leading-6 focus:outline-none">
								<router-link
									:to="menu.uri"
									@click="menuStore.selectedMenuId = menu.id"
									class="text-gray-800 hover:text-primary transition-colors duration-150 flex"
									>{{ menu.name }}
									<chevron-down-icon class="-mr-1 h-5 w-5" aria-hidden="true" />
								</router-link>
							</button>
						</div>

						<transition
							enter-active-class="transition ease-out duration-100"
							enter-from-class="transform opacity-0 scale-95"
							enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75"
							leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95">
							<ul
								v-if="dropdownVerse"
								class="absolute -left-1 w-44 px-2 origin-top-left divide-y divide-dashed divide-primary rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div v-for="child in menu.children" :key="child.id" class="">
									<router-link
										:to="child.uri"
										@click="
											menuStore.selectedMenuId = menu.id;
											dropdownVerse = false;
										"
										class="block my-1 px-4 py-1 text-sm text-gray-800 hover:text-primary transition-colors duration-150">
										{{ child.name }}
									</router-link>
								</div>
							</ul>
						</transition>
					</div>

					<!-- children없는 메뉴 -->
					<div
						v-else
						class="my-2 flex items-stretch gap-x-1 text-sm font-semibold leading-6 text-gray-500-700 focus:outline-none">
						<router-link
							:to="menu.uri"
							@click="menuStore.selectedMenuId = menu.id"
							class="text-gray-800 hover:text-primary transition-colors duration-150"
							>{{ menu.name }}
						</router-link>
					</div>
				</div>
			</div>
			<!-- 로그인 버튼 -->
			<div class="hidden sm:flex sm:flex-1 sm:justify-end">
				<button
					@click="openLoginModal = true"
					v-if="!loginFormStore.isMounted && !memberStore.id"
					class="text-sm hover:text-primary transition-colors duration-150 font-semibold leading-6">
					회원가입/로그인 <span aria-hidden="true">&rarr;</span>
				</button>
				<span v-if="memberStore.id"> {{ memberStore.id }}</span>
			</div>
			<login-method-modal-view
				:open="openLoginModal"
				@close-modal="openLoginModal = false"></login-method-modal-view>
		</nav>
	</header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useLoginFormStore, useMenuStore, useMemberStore } from '@/stores/store';
import LoginMethodModalView from '@/views/member/LoginMethodModalView.vue';

const menuStore = useMenuStore();
const loginFormStore = useLoginFormStore();
const memberStore = useMemberStore();

const dropdownVerse = ref(false);
const openLoginModal = ref(false);

onMounted(async () => {
	await menuStore.fetchMenus();
});
</script>
