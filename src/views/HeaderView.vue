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

			<!-- {{ menu }} -->
			<div class="sm:flex sm:gap-x-12">
				<div v-for="menu in store.getMenus" :key="menu.id">
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
									@click="store.selectedMenuId = menu.id"
									class="text-gray-link hover:text-primary transition-colors duration-150 flex"
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
								class="absolute -left-1 w-44 px-2 origin-top-left divide-y divide-dashed divide-primary divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div v-for="child in menu.children" :key="child.id" class="">
									<!-- <li class=""> -->
									<router-link
										:to="child.uri"
										@click="
											store.selectedMenuId = menu.id;
											dropdownVerse = false;
										"
										class="block my-1 px-4 py-1 text-sm text-gray-link hover:text-primary transition-colors duration-150">
										{{ child.name }}
									</router-link>
									<!-- </li> -->
								</div>
							</ul>
						</transition>
					</div>

					<!-- children없는 메뉴 -->
					<div
						v-else
						class="my-2 flex items-stretch gap-x-1 text-sm font-semibold leading-6 text-gray-700 focus:outline-none">
						<router-link
							:to="menu.uri"
							@click="store.selectedMenuId = menu.id"
							class="text-gray-link hover:text-primary transition-colors duration-150"
							>{{ menu.name }}
						</router-link>
					</div>
				</div>
			</div>
			<!-- 로그인 버튼 -->
			<div class="hidden sm:flex sm:flex-1 sm:justify-end">
				<router-link
					to="#"
					class="text-sm hover:text-primary transition-colors duration-150 font-semibold leading-6"
					>Log in <span aria-hidden="true">&rarr;</span></router-link
				>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems
} from '@headlessui/vue';
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon
} from '@heroicons/vue/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid';
import { useMenuStore } from '@/stores/store';

const products = [
	{
		name: 'Analytics',
		description: 'Get a better understanding of your traffic',
		href: '#',
		icon: ChartPieIcon
	},
	{
		name: 'Engagement',
		description: 'Speak directly to your customers',
		href: '#',
		icon: CursorArrowRaysIcon
	},
	{
		name: 'Security',
		description: 'Your customers’ data will be safe and secure',
		href: '#',
		icon: FingerPrintIcon
	},
	{
		name: 'Integrations',
		description: 'Connect with third-party tools',
		href: '#',
		icon: SquaresPlusIcon
	},
	{
		name: 'Automations',
		description: 'Build strategic funnels that will convert',
		href: '#',
		icon: ArrowPathIcon
	}
];
const callsToAction = [
	{ name: 'Watch demo', href: '#', icon: PlayCircleIcon },
	{ name: 'Contact sales', href: '#', icon: PhoneIcon }
];

const store = useMenuStore();

const dropdownVerse = ref(false);
</script>
