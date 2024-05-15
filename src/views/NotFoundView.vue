<template>
	<!-- <div> -->
	<!-- <div> -->
	<main
		class="grid grid-cols-6 grid-rows-2 min-w-full min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center col-start-2 col-span-4">
			<p class="text-base font-semibold text-indigo-600">404</p>
			<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Page not found
			</h1>
			<p class="mt-6 text-base leading-7 text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
			<div class="mt-8 flex items-center justify-center gap-x-6">
				<button
					@click="$router.back"
					class="btn-lg bg-primary hover:bg-primary-over active:bg-primary-press px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
					돌아가기
				</button>
			</div>
		</div>
	</main>
	<!-- </div> -->
	<!-- </div> -->
</template>

<script setup></script>
