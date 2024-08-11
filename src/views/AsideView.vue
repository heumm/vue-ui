<template>
	<div>
		<aside v-if="store.selectedMenu">
			<router-link
				:to="store.selectedMenu.uri"
				class="block btn-lg rounded-sm bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark py-3 mb-2 text-center text-md align-middle">
				{{ store.selectedMenu.name }}
			</router-link>
			<div class="pr-1 divide-y divide-secondary">
				<div v-for="(child, index) in store.selectedMenu.children" :key="index" class="">
					<router-link
						:to="child.uri"
						class="text-gray-800 hover:text-secondary transition-color duration-150 py-2 px-1 text-sm flex">
						{{ child.name }}
						<chevron-right-icon
							class="-mr-1 h-5 w-5 text-gray-500-400"
							aria-hidden="true"></chevron-right-icon>
					</router-link>
				</div>
			</div>
		</aside>
	</div>
</template>

<script setup>
import { useMenuStore } from '@/stores/store';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
const store = useMenuStore();
</script>
