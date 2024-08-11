<template>
	<div>
		<div class="flex flex-col w-full gap-y-2">
			<div class="flex justify-between">
				<div class="flex gap-x-1">
					<sm-button color="primary" size="xs" @click="store.setLayout('table')"> 목록 </sm-button>
					<sm-button color="primary" size="xs" @click="store.setLayout('card')"> 카드 </sm-button>
				</div>
				<div class="flex gap-x-1">
					<sm-select size="sm" v-model="searchFlag" :options="searchOptions" />
					<sm-input v-model="searchVal" size="sm" placeholder="검색어를 입력하세요." />
					<sm-button
						size="xs"
						color="primary"
						@click="
							$router.push({ path: $route.path, query: { flag: searchFlag, q: searchVal } });
							api.get.todayQt();
						"
						>검색</sm-button
					>
				</div>
			</div>

			<div v-if="store.getLayout.value === 'table'" class="flex">
				<table class="grow border-separate border-spacing-1">
					<colgroup>
						<col class="w-[10%]" />
						<col class="w-[70%]" />
						<col class="w-[20%]" />
					</colgroup>
					<thead class="text-left bg-secondary text-white">
						<tr>
							<th class="px-3 py-1 rounded-sm">ID</th>
							<th class="px-3 py-1 rounded-sm">제목</th>
							<th class="px-3 py-1 rounded-sm">작성일</th>
							<!-- <th></th> -->
						</tr>
					</thead>
					<tbody class="text-sm text-gray-800">
						<tr v-for="post in posts" :key="post.id">
							<td class="px-3 py-1 border-b border-gray-500">{{ post.id }}</td>
							<td class="px-3 py-1 border-b border-gray-500">
								<router-link
									:to="`${$route.path}/${post.id}`"
									class="hover:text-secondary active:text-secondary-dark transition-colors duration-150 block"
									>{{ post.title }}</router-link
								>
							</td>
							<td class="px-3 py-1 border-b border-gray-500">{{ post.regDate }}</td>
							<!-- <td><img :src="post.imageUrl" alt="Post Image" width="100" /></td> -->
						</tr>
					</tbody>
				</table>
			</div>

			<div v-else-if="store.getLayout.value === 'card'">
				<div class="flex flex-wrap gap-x-5 gap-y-5">
					<div
						class="flex flex-col gap-y-1 hover:bg-primary p-3 rounded hover:bg-opacity-10 hover:cursor-pointer hover:text-primary-dark transition-colors duration-75"
						v-for="(post, index) in posts"
						:key="post.id"
						@click="$router.push(`${$route.path}/${post.id}`)">
						<img :src="post.imageUrl" class="w-[180px] h-[150px] rounded" alt="Post Image" />
						<span class="text-center">{{ post.title }}</span>
						<!-- <p class="hover:cursor-pointer">{{ post.content }}</p> -->
					</div>
				</div>
			</div>
			<!-- SmPageIndicator.vue파일로 컴포넌트화 시킬 부분start -->
			<sm-page-indicator
				v-model="pageNo"
				:pageSize="pageSize"
				:indicatorSize="5"
				:totalCount="totalCount"
				@prev="api.get.todayQt()"
				@next="api.get.todayQt()"
				@clickIndex="api.get.todayQt()"></sm-page-indicator>
			<sm-button
				size="sm"
				class="self-end"
				color="secondary"
				@click="$router.push(`${$route.path}/edit`)"
				>글쓰기</sm-button
			>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TableCellsIcon } from '@heroicons/vue/20/solid';
import { useBoardLayoutStore } from '@/stores/store';
import httpRequest from '@/axios/axios.js';
// import format from '@/util/format.js';
import { formatDate } from '@/util/format.js';
import SmButton from '@/components/buttons/SmButton.vue';
import SmInput from '@/components/SmInput.vue';
import SmSelect from '@/components/SmSelect.vue';
import SmPageIndicator from '@/components/SmPageIndicator.vue';
const route = useRoute();
const store = useBoardLayoutStore();
const searchVal = ref('');
const searchFlag = ref('1');
const searchOptions = [
	{
		value: '1',
		text: '제목'
	},
	{
		value: '2',
		text: '내용'
	},
	{
		value: '3',
		text: '제목+내용'
	}
];
const posts = ref([]);

// paging부분 start
const pageNo = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
//paging부분 end
// 라우트가 변경될 때 데이터를 다시 로드합니다.
watch(route, (newRoute) => {
	searchFlag.value = newRoute.query.flag ? newRoute.query.flag : '1';
	searchVal.value = newRoute.query.q || '';
	api.get.todayQt();
});

// 컴포넌트가 처음 로드될 때 데이터를 가져오기.
onMounted(() => {
	api.get.todayQt();
});

const api = {
	get: {
		todayQt: () => {
			httpRequest
				.get('/api/v1/quiet-time/list', {
					params: {
						pageNo: pageNo.value,
						pageSize: pageSize.value,
						searchFlag: searchFlag.value,
						searchVal: searchVal.value
					}
				})
				.then((res) => {
					const data = res.data;
					totalCount.value = data.totalCount;
					posts.value = [...data.articles];
					// 모든 배열 요소에 대해 regDate 포맷팅 적용
					posts.value = posts.value.map((post) => {
						return {
							...post,
							regDate: formatDate(post.regDate)
						};
					});
				})
				.catch((err) => {});
		}
	}
};
</script>
