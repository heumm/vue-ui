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
					<tbody class="text-sm text-gray-400">
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
			<router-link
				:to="`${$route.path}/new`"
				class="btn-sm bg-primary hover:bg-primary-dark active:bg-primary-extradark self-end"
				>글쓰기</router-link
			>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { TableCellsIcon } from '@heroicons/vue/20/solid';
import { useBoardLayoutStore } from '@/stores/store';
const layout = ref('table'); // 초기 레이아웃 설정

const posts = ref([
	{
		id: 1,
		title: '제목 1',
		content: '내용 1',
		regDate: '2024-05-02',
		imageUrl: 'https://via.placeholder.com/150'
	},
	{
		id: 2,
		title: '제목 2',
		content: '내용 2',
		regDate: '2024-05-02',
		imageUrl: 'https://via.placeholder.com/150'
	},
	{
		id: 3,
		title: '제목 3',
		content: '내용 3',
		regDate: '2024-05-02',
		imageUrl: 'https://via.placeholder.com/150'
	},
	{
		id: 4,
		title: '제목 4',
		content: '내용 4',
		regDate: '2024-05-02',
		imageUrl: 'https://via.placeholder.com/150'
	},
	{
		id: 5,
		title: '제목 5',
		content: '내용 5',
		regDate: '2024-05-02',
		imageUrl: 'https://via.placeholder.com/150'
	}
	// 데이터 예시. 실제 데이터로 교체하세요.
]);

const store = useBoardLayoutStore();
</script>
