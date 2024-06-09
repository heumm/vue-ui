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
							v-model="email"
							@input="
								validation.email();
								hasEmailChecked = false;
							" />
						<button
							class="disabled:bg-gray-200 disabled:text-gray-400 text-gray-500 text-sm text-nowrap p-3 rounded-r-lg border-r border-y"
							@click="api.isEmailNotConflict"
							:disabled="hasEmailChecked">
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
						@input="validation.password" />
				</div>

				<div class="mb-6">
					<input
						type="password"
						id="confirmPassword"
						placeholder="비밀번호를 다시 한번 입력해주세요."
						class="w-full p-3 border rounded-lg focus:outline-none focus:border-primary"
						v-model="confirmPassword"
						@input="validation.password" />
					<p v-if="passwordErrorMsg" class="text-danger text-sm mt-1">{{ passwordErrorMsg }}</p>
					<p class="text-gray-500 text-sm mt-1">
						영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
					</p>
				</div>

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
import { ref, watch } from 'vue';
import router from '@/router';

const email = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordErrorMsg = ref('');
const emailVaildationMsg = ref('');
const isEmailValid = ref(false);
const hasEmailChecked = ref(false);

const api = {
	join: async () => {
		if (!validation.email()) return false;
		if (!hasEmailChecked.value) {
			isEmailValid.value = false;
			emailVaildationMsg.value = '이메일 중복 확인이 필요합니다.';
		}
		// const isEmailNotConflict = await api.isEmailNotConflict();
		if (!(await api.isEmailNotConflict())) return false;
		if (!validation.password()) return false;
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
	},
	isEmailNotConflict: async () => {
		let isNotConflict = false;
		if (!validation.email()) return false;
		try {
			const res = await axios.post('/api/v1/member/check', {
				email: email.value
			});
			isEmailValid.value = res.data;
			emailVaildationMsg.value = '사용 가능한 이메일입니다.';
			isNotConflict = true;
		} catch (err) {
			isEmailValid.value = false;
			if (err.response.status === 409) {
				emailVaildationMsg.value = '중복된 이메일입니다.';
				isNotConflict = false;
			}
		} finally {
			hasEmailChecked.value = true;
		}
		return isNotConflict;
	}
};

const validation = {
	email: () => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (regex.test(email.value)) {
			isEmailValid.value = true;
			emailVaildationMsg.value = '';
		} else {
			isEmailValid.value = false;
			emailVaildationMsg.value = '올바른 이메일을 입력해주세요.';
		}
		return isEmailValid.value;
	},
	password: () => {
		const passwordValue = password.value;
		const confirmPasswordValue = confirmPassword.value;
		const lengthRequirement = /.{8,16}/;
		const englishRequirement = /[a-zA-Z]/;
		let isValid = false;
		const numberRequirement = /[0-9]/;
		// const specialCharRequirement = /[!@#$%^&*(),.?":{}|<script>]/;

		if (!lengthRequirement.test(passwordValue)) {
			passwordErrorMsg.value = '비밀번호는 8자 이상 16자 이하여야 합니다.';
		} else if (
			!englishRequirement.test(passwordValue) ||
			!numberRequirement.test(passwordValue)
			// 	!specialCharRequirement.test(passwordValue)
		) {
			passwordErrorMsg.value = '비밀번호는 영문, 숫자를 포함해야 합니다.';
		} else if (passwordValue !== confirmPasswordValue) {
			passwordErrorMsg.value = '비밀번호가 일치하지 않습니다.';
		} else {
			passwordErrorMsg.value = '';
			isValid = true;
		}
		return isValid;
	}
};

// watch(email, (newValue) => {
// 	console.log('newValue: =', newValue);
// 	// if (newValue === ' ') {
// 	// 	console.log('공백들어옴');
// 	// 	email.value = oldValue;
// 	// }
// 	validation.email(newValue);
// });
</script>
