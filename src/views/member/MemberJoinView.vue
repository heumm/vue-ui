<template>
	<div class="">
		<div class="col-span-full flex items-center justify-center min-h-screen">
			<div class="bg-white p-8 rounded-lg w-full max-w-md">
				<h2 class="text-center text-2xl font-bold mb-6">회원가입</h2>

				<div class="mb-4">
					<label for="email" class="block text-gray-400 mb-2 after:content-['*'] after:text-danger"
						>이메일</label
					>
					<div class="flex">
						<input
							type="email"
							id="email"
							placeholder="이메일을 입력해주세요."
							class="w-full p-3 border rounded-l-lg focus:outline-none focus:border-primary"
							v-model="email" />
						<button
							class="disabled:bg-gray-200 disabled:text-gray-400 text-gray-500 text-sm text-nowrap p-3 rounded-r-lg border-r border-y"
							@click="api.checkEmailConflict">
							중복 확인
						</button>
					</div>
				</div>
				<p
					v-if="emailVaildationMsg"
					:class="isEmailValid ? 'text-success' : 'text-danger'"
					class="text-sm mt-1">
					{{ emailVaildationMsg }}
				</p>
				<div class="mb-4">
					<label for="name" class="block text-gray-400 mb-2 after:content-['*'] after:text-danger"
						>이름</label
					>
					<input
						type="text"
						id="name"
						placeholder="이름을 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="name" />
				</div>

				<div class="mb-2">
					<label
						for="password"
						class="block text-gray-400 mb-2 after:content-['*'] after:text-danger"
						>비밀번호</label
					>
					<input
						type="password"
						id="password"
						placeholder="비밀번호를 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="password"
						@input="validatePassword" />
				</div>

				<div class="mb-6">
					<input
						type="password"
						id="confirmPassword"
						placeholder="비밀번호를 다시 한번 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="confirmPassword"
						@input="validatePassword" />
					<p v-if="passwordErrorMsg" class="text-danger text-sm mt-1">{{ passwordErrorMsg }}</p>
					<p class="text-gray-500 text-sm mt-1">
						영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
					</p>
				</div>

				<!-- <div class="mb-6">
					<label class="block text-gray-500-700 mb-2">동의 사항</label>
					<div class="flex items-center mb-2">
						<input type="checkbox" id="agreeAll" class="mr-2" />
						<label for="agreeAll" class="text-gray-500-700">전체 동의</label>
					</div>
					<div class="ml-4">
						<div class="flex items-center mb-2">
							<input type="checkbox" id="agree14" class="mr-2" />
							<label for="agree14" class="text-gray-500-700">만 14세 이상입니다. (필수)</label>
						</div>
						<div class="flex items-center mb-2">
							<input type="checkbox" id="agreeTerms" class="mr-2" />
							<label for="agreeTerms" class="text-gray-500-700">원티드 이용약관 동의 (필수)</label>
						</div>
						<div class="flex items-center mb-2">
							<input type="checkbox" id="agreePrivacy" class="mr-2" />
							<label for="agreePrivacy" class="text-gray-500-700"
								>원티드 개인정보 수집 및 이용 동의 (필수)</label
							>
						</div>
						<div class="flex items-center mb-2">
							<input type="checkbox" id="agreeInfo" class="mr-2" />
							<label for="agreeInfo" class="text-gray-500-700"
								>채용 소식, 커리어 콘텐츠, 이벤트 등 원티드 맞춤 정보 받기</label
							>
						</div>
						<div class="flex items-center">
							<input type="checkbox" id="agreeRecommend" class="mr-2" />
							<label for="agreeRecommend" class="text-gray-500-700">맞춤 추천 포지션 정보 받기</label>
						</div>
					</div>
				</div> -->

				<button
					:disabled="passwordErrorMsg !== ''"
					class="w-full btn-lg bg-primary hover:bg-primary-dark active:bg-primary-extradark disabled:bg-gray-500"
					@click="api.join">
					가입하기
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from '@/axios/axios.js';
import { ref } from 'vue';
import router from '@/router';

const email = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordErrorMsg = ref('');
const emailVaildationMsg = ref('');
const isEmailValid = ref(false);
const hasEmailChecked = ref(false);
// const agreeAll = ref(false);
// const agree14 = ref(false);
// const agreeTerms = ref(false);
// const agreePrivacy = ref(false);
// const agreeInfo = ref(false);
// const agreeRecommend = ref(false);

const validatePassword = () => {
	const passwordValue = password.value;
	const confirmPasswordValue = confirmPassword.value;
	const lengthRequirement = /.{8,16}/;
	// const lowercaseRequirement = /[a-z]/;
	// const uppercaseRequirement = /[A-Z]/;
	// const numberRequirement = /[0-9]/;
	// const specialCharRequirement = /[!@#$%^&*(),.?":{}|<script>]/;

	if (!lengthRequirement.test(passwordValue)) {
		passwordErrorMsg.value = '비밀번호는 8자 이상 16자 이하여야 합니다.';
	}
	// else if (
	// 	!lowercaseRequirement.test(passwordValue) ||
	// 	!uppercaseRequirement.test(passwordValue) ||
	// 	!numberRequirement.test(passwordValue) ||
	// 	!specialCharRequirement.test(passwordValue)
	// ) {
	// 	passwordError.value = '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.';
	// }
	else if (passwordValue !== confirmPasswordValue) {
		passwordErrorMsg.value = '비밀번호가 일치하지 않습니다.';
	} else {
		passwordErrorMsg.value = '';
	}
};

const api = {
	join: () => {
		if (hasEmailChecked.value && isEmailValid.value) {
			axios
				.post('/api/v1/member/join', {
					email: email.value,
					name: name.value,
					password: password.value
				})
				.then((res) => {
					router.push('/');
				})
				.catch((err) => {
					if (err.response.data.code === 409) {
						isEmailValid.value = false;
						emailVaildationMsg.value = '중복된 이메일입니다.';
					}
				});
		} else if (!hasEmailChecked.value) {
			isEmailValid.value = false;
			emailVaildationMsg.value = '이메일 중복 확인이 필요합니다.';
		} else if (!isEmailValid.value) {
			isEmailValid.value = false;
			emailVaildationMsg.value = '올바른 이메일을 입력해주세요.';
		}
	},
	checkEmailConflict: () => {
		axios
			.post('/api/v1/member/check', {
				email: email.value
			})
			.then((res) => {
				isEmailValid.value = res.data;
				emailVaildationMsg.value = '사용 가능한 이메일입니다.';
			})
			.catch((err) => {
				isEmailValid.value = false;
				emailVaildationMsg.value = '중복된 이메일입니다.';
			})
			.finally(() => {
				hasEmailChecked.value = true;
			});
	}
};
</script>
