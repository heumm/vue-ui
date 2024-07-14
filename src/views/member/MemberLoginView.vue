<template>
	<div>
		<div class="col-span-full flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg w-full max-w-md">
				<h2 class="text-center text-3xl font-bold mb-11">이메일로 로그인</h2>

				<div class="mb-4">
					<label for="email" class="block text-gray-500 mb-2">이메일</label>
					<input
						type="email"
						id="email"
						placeholder="이메일을 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="email"
						@keyup.enter="api.post.login" />
				</div>

				<div class="mb-8 relative">
					<label for="password" class="block text-gray-500 mb-2">비밀번호</label>
					<input
						:type="passwordVisible ? 'text' : 'password'"
						id="password"
						placeholder="비밀번호를 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="password"
						@keyup.enter="api.post.login" />
					<button
						type="button"
						@click="togglePasswordVisibility"
						class="absolute right-3 top-1/2 transform translate-y-[15%]">
						<svg-icon
							v-if="passwordVisible"
							type="mdi"
							:path="mdiEyeOutline"
							class="fill-gray-500"></svg-icon>
						<svg-icon v-else type="mdi" :path="mdiEyeOffOutline" class="fill-gray-500"></svg-icon>
					</button>
				</div>
				<p v-if="isLoginFailed" class="text-danger text-sm mb-3">{{ loginErrorMessage }}</p>
				<button
					class="w-full bg-primary hover:bg-primary-dark active:bg-primary-extradark btn-lg disabled:bg-gray-500"
					@click="api.post.login">
					로그인
				</button>

				<div class="flex items-center justify-center my-11">
					<hr class="w-full" />
					<span class="absolute px-4 bg-white text-gray-500-500">또는</span>
				</div>

				<button
					class="w-full bg-info mb-4 hover:bg-info-dark active:bg-info-extradark btn-lg"
					@click="$router.push('/join')">
					이메일로 회원가입
				</button>

				<p class="text-center text-gray-500"><router-link to="#">비밀번호 재설정</router-link></p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { useCsrfTokenStore, useLoginFormStore, useMemberStore } from '@/stores/store';
import httpRequest from '@/axios/axios.js';
// import { getCsrfToken } from '@/axios/axios.js';
import router from '@/router';

const passwordVisible = ref(false);
const email = ref('');
const password = ref('');
const isLoginFailed = ref(false);
const loginErrorMessage = ref('');
const loginFormStore = useLoginFormStore();
const memberStore = useMemberStore();
const togglePasswordVisibility = () => {
	passwordVisible.value = !passwordVisible.value;
};

const api = {
	post: {
		login: () => {
			httpRequest
				.post('/api/v1/member/login', {
					email: email.value,
					password: password.value
				})
				.then((res) => {
					memberStore.id = res.data.id;
					memberStore.name = res.data.name;
					// router.push('/');
					router.go(-1);
				})
				.catch((err) => {
					// console.log(err);
					isLoginFailed.value = true;
					loginErrorMessage.value = err.response.data.message;
				});
		}
	},
	get: {
		initToken: () => {
			httpRequest
				.get('/api/v1')
				.then(() => {})
				.catch(() => {});
		}
	}
};

onMounted(() => {
	// alert('ㅎㅇ');
	loginFormStore.isMounted = true;
	const csrfStore = useCsrfTokenStore();
	csrfStore.generateToken();
});

onUnmounted(() => {
	loginFormStore.isMounted = false;
});
</script>

<style lang="scss" scoped></style>
