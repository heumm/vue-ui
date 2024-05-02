<template>
	<header>
		<nav class="mx-auto flex max-w-5xl items-center justify-between p-4 sm:px-8">
			<div class="flex sm:flex-1">
				<RouterLink to="/" class="-m-1.5 p-1.5">
					<span class="sr-only">Your Company</span>
					<img
						class="h-8 w-auto dark:invert"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="" />
				</RouterLink>
			</div>
			<div class="sm:flex sm:gap-x-12">
				<div
					class="my-2 flex items-stretch gap-x-1 text-sm font-semibold leading-6 text-gray-700 focus:outline-none">
					<RouterLink to="/detail/posts" active-class="text-gray-900">교회소식 </RouterLink>
				</div>

				<div
					@mouseenter="dropdownVerse = true"
					@mouseleave="dropdownVerse = false"
					class="inline-block relative text-left">
					<div class="flex my-2">
						<button
							class="flex place-self-stretch gap-x-1 text-sm font-semibold leading-6 text-gray-700 focus:outline-none">
							<RouterLink to="/detail/verses" active-class="text-gray-900">예배말씀</RouterLink>
							<ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
							class="absolute -left-1 w-44 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div class="py-1">
								<li class="text-gray-700 px-4 py-2 text-sm">
									<RouterLink
										to="/detail/todayqt"
										class="block"
										active-class="bg-gray-100 text-gray-900"
										>오늘의 묵상
									</RouterLink>
								</li>
								<li class="text-gray-700 px-4 py-2 text-sm">
									<RouterLink
										to="/detail/bulletin"
										class="block"
										active-class="bg-gray-100 text-gray-900"
										>주보
									</RouterLink>
								</li>
							</div>
						</ul>
					</transition>
				</div>
			</div>

			<div class="hidden sm:flex sm:flex-1 sm:justify-end">
				<RouterLink to="#" class="text-sm font-semibold leading-6 text-gray-900"
					>Log in <span aria-hidden="true">&rarr;</span></RouterLink
				>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { ref } from 'vue';
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

const dropdownVerse = ref(true);
</script>
