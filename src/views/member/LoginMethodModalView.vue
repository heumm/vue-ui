<template>
	<div>
		<transition
			enter="ease-out duration-300"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="ease-in duration-200"
			leave-from="opacity-100"
			leave-to="opacity-0">
			<div
				v-if="loginFormStore.isOpen"
				class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-80"
				@click="loginFormStore.close()">
				<div class="bg-white rounded-lg p-8 w-full max-w-sm" @click.stop>
					<h1 class="text-center text-2xl font-bold mb-4">
						쉽게 가입하고<br />
						간편하게 로그인하세요.
					</h1>

					<button
						class="bg-yellow-400 text-black w-full py-2 mb-4 rounded-lg flex items-center justify-center">
						카카오 계정으로 계속하기
					</button>
					<!-- <button
						class="bg-white border w-full py-2 mb-4 rounded-lg flex items-center justify-center">
						애플 계정으로 계속하기
					</button>
					<button
						class="bg-white border w-full py-2 mb-4 rounded-lg flex items-center justify-center">
						구글 계정으로 계속하기
					</button> -->
					<button
						class="btn-lg bg-primary w-full hover:bg-primary-dark active:bg-primary-extradark"
						@click="
							$router.push(`/login`);
							loginFormStore.close();
						">
						이메일로 계속하기
					</button>
					<p class="text-center text-gray-500-500 mt-4 text-sm text-gray-500">
						계정을 잊으셨나요? <a href="#" class="text-gray-400">계정 찾기</a>
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { useLoginFormStore } from '@/stores/store';
import { ref } from 'vue';

const loginFormStore = useLoginFormStore();
</script>

<style lang="scss" scoped></style>
