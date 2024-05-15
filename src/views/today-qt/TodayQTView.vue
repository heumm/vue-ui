<template>
	<div>
		<div class="flex flex-col justify-between w-full">
			<div>오늘의 묵상</div>
			<div class="flex flex-row-reverse">
				<router-link
					:to="`${$route.path}/edit`"
					class="btn-sm bg-primary hover:bg-primary-over active:bg-primary-press"
					>작성하기
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
