import { createPinia } from 'pinia';

// 플러그인 함수 정의
const usePersistedStatePlugin = ({ store }) => {
	// 'member' 스토어를 배제하기 위해 스토어 ID 확인
	// if (store.$id === 'member') {
	// 	return;
	// }
	// 스토어의 상태를 localStorage에서 복원
	const storedState = localStorage.getItem(store.$id);
	if (storedState) {
		store.$patch(JSON.parse(storedState));
	}

	// 스토어의 상태가 변경될 때마다 localStorage에 저장
	store.$subscribe((mutation, state) => {
		localStorage.setItem(store.$id, JSON.stringify(state));
	});
};

// Pinia 인스턴스 생성
const pinia = createPinia();

// 플러그인 등록
pinia.use(usePersistedStatePlugin);

export default pinia;
