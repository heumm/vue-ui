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
						class="btn-lg bg-[#FEE500] text-[#000000] text-opacity-[85%] w-full rounded-[12px] flex items-center justify-center mb-1"
						@click="api.kakaoLogin()">
						<span class="mr-2">
							<svg viewBox="0 0 21 20" width="21" height="20" fill="none" class="css-1h47l4s">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10.5 2.62891C6.16282 2.62891 2.64282 5.36319 2.64282 8.72605C2.64282 10.8239 4.00211 12.6546 6.07639 13.7703L5.20425 16.9682C5.1878 17.0318 5.19118 17.0989 5.21396 17.1605C5.23673 17.2222 5.27781 17.2754 5.33167 17.313C5.38554 17.3506 5.44962 17.3709 5.51532 17.371C5.58102 17.3712 5.6452 17.3513 5.69925 17.3139L9.51782 14.776C9.83997 14.776 10.17 14.8311 10.5 14.8311C14.8371 14.8311 18.3571 12.0968 18.3571 8.72605C18.3571 5.35534 14.8371 2.62891 10.5 2.62891Z"
									fill="#000000"></path>
							</svg>
						</span>
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
						class="btn-lg rounded-[12px] bg-primary w-full hover:bg-primary-dark active:bg-primary-extradark"
						@click="
							$router.push(`/login`);
							loginFormStore.close();
						">
						이메일로 계속하기
					</button>
					<p class="text-center text-gray-500-500 mt-4 text-sm text-gray-500">
						계정을 잊으셨나요?
						<a
							href="#"
							class="text-gray-400 transition-colors duration-150 hover:text-primary active:text-primary-dark"
							>계정 찾기</a
						>
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { useLoginFormStore } from '@/stores/store';
import httpRequest from '@/axios/axios.js';
import { ref } from 'vue';

const loginFormStore = useLoginFormStore();

const api = {
	kakaoLogin: () => {
		// Kakao.Auth.authorize({
		// 	redirectUri: 'http://localhost:8080/login/oauth2/code/kakao',
		// 	scope: 'openId'
		// });

		// 	httpRequest
		// 		.get('http://localhost:8080/oauth2/authorization/kakao')
		// 		.then((res) => {
		// 			console.log(res);
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
	}
};
</script>

<style lang="scss" scoped></style>
