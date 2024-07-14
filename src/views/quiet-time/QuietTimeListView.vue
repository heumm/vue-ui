<template>
	<div>
		<div class="flex flex-col w-full gap-y-2">
			<div class="flex justify-between">
				<div class="flex gap-x-1">
					<button
						class="btn-xs bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark"
						@click="store.setLayout('table')">
						목록
						<!-- <table-cells-icon></table-cells-icon> -->
					</button>
					<button
						class="btn-xs bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark"
						@click="store.setLayout('card')">
						카드
					</button>
				</div>
				<div class="flex gap-x-1">
					<select class="outline-none border focus:border-secondary rounded text-sm" name="" id="">
						<option value="">제목</option>
						<option value="">작성자</option>
						<option value="">제목+내용</option>
					</select>
					<input
						type="text"
						class="grow px-1 outline-none border focus:border-secondary rounded placeholder:text-sm" />
					<button class="btn-xs bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark">
						검색
					</button>
				</div>
			</div>

			<div v-if="store.getLayout.value === 'table'" class="flex">
				<table class="grow border-separate border-spacing-1">
					<colgroup>
						<col class="w-[10%]" />
						<col class="w-[70%]" />
						<col class="w-[20%]" />
					</colgroup>
					<thead class="text-left bg-info text-white">
						<tr>
							<th class="px-3 py-1 rounded-sm">ID</th>
							<th class="px-3 py-1 rounded-sm">제목</th>
							<th class="px-3 py-1 rounded-sm">작성일</th>
							<!-- <th></th> -->
						</tr>
					</thead>
					<tbody class="text-sm text-gray-800">
						<tr v-for="post in posts" :key="post.id">
							<td class="px-3 py-1 border-b">{{ post.id }}</td>
							<td class="px-3 py-1 border-b">
								<router-link :to="`${$route.path}/${post.id}`">{{ post.title }}</router-link>
							</td>
							<td class="px-3 py-1 border-b">{{ post.regDate }}</td>
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
				<!-- <div
					v-for="(row, rowIndex) in rows"
					:key="rowIndex"
					class="grid"
					:class="'grid-cols-' + columns">
					<div v-for="(post, index) in row" :key="post.id" class="card">
						<div class="card-image">
							<img :src="post.imageUrl" alt="Post Image" />
							<h3>{{ post.title }}</h3>
							<p>{{ post.content }}</p>
						</div>
					</div>
				</div> -->
			</div>

			<div class="flex justify-center mt-4">
				<button
					class="btn-xs bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark disabled:bg-disabled mx-1"
					:disabled="isFirstPage"
					@click="
						pageNo = Math.max(1, startPageIndex - onePage);
						api.get.todayQt();
					">
					이전
				</button>
				<button
					v-for="pageIndex in pageArray"
					:key="pageIndex"
					class="btn-xs mx-1"
					:class="pageIndex === pageNo ? 'bg-secondary-dark' : 'bg-secondary'"
					:disabled="pageIndex === pageNo"
					@click="
						pageNo = pageIndex;
						api.get.todayQt();
					">
					{{ pageIndex }}
				</button>
				<button
					class="btn-xs bg-secondary hover:bg-secondary-dark active:bg-secondary-extradark disabled:bg-disabled mx-1"
					:disabled="isLastPage"
					@click="
						pageNo = Math.min(totalPageNum, startPageIndex + onePage);
						api.get.todayQt();
					">
					다음
				</button>
			</div>

			<router-link
				:to="`${$route.path}/edit`"
				class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark self-end"
				>글쓰기</router-link
			>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { TableCellsIcon } from '@heroicons/vue/20/solid';
import { useBoardLayoutStore } from '@/stores/store';
import httpRequest from '@/axios/axios.js';
// import format from '@/util/format.js';
import { formatDate } from '@/util/format.js';
const layout = ref('table'); // 초기 레이아웃 설정

const posts = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const totalPageNum = computed(() => Math.floor(totalCount.value / pageSize.value));
const onePage = ref(5);
const totalCount = ref(0);
const store = useBoardLayoutStore();
const startPageIndex = computed(
	() => Math.floor((pageNo.value - 1) / onePage.value) * onePage.value + 1
);

const endPageIndex = computed(() => startPageIndex.value + onePage.value - 1);

const isFirstPage = computed(() => endPageIndex.value <= onePage.value);

const isLastPage = computed(() => totalPageNum.value - startPageIndex.value < 5);
const pageArray = computed(() => {
	const arr = [];
	for (let i = startPageIndex.value; i <= Math.min(totalPageNum.value, endPageIndex.value); i++) {
		arr.push(i);
	}

	return arr;
});

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
						pageSize: pageSize.value
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
