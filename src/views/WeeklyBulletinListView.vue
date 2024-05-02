<template>
	<div>
		<div>
			<table class="table-auto border-collapse border border-slate-500">
				<thead>
					<tr class="border border-slate-500">
						<th class="p-3 border-r border-slate-500">Song</th>
						<th class="p-3">Artist</th>
						<th class="p-3">Year</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border border-slate-500">
						<td class="p-3">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
						<td class="p-3">Malcolm Lockyer</td>
						<td class="p-3">1961</td>
					</tr>
					<tr class="border border-slate-500">
						<td class="p-3">Witchy Woman</td>
						<td class="p-3">The Eagles</td>
						<td class="p-3">1972</td>
					</tr>
					<tr class="border border-slate-500">
						<td class="p-3">Shining Star</td>
						<td class="p-3">Earth, Wind, and Fire</td>
						<td class="p-3">1975</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({});
</script>

<style lang="scss" scoped></style>
