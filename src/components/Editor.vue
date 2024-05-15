<template>
	<quill-editor
		v-model:value="state.content"
		:options="state.editorOption"
		:disabled="state.disabled"
		@blur="onEditorBlur($event)"
		@focus="onEditorFocus($event)"
		@ready="onEditorReady($event)"
		@change="onEditorChange($event)" />
</template>

<script setup>
import { reactive, defineProps } from 'vue';

// export default {
// 	name: 'MyEditor',
// setup() {
const props = defineProps({
	contents: {
		type: String,
		default: ''
	}
});

const state = reactive({
	content: '',
	_content: '',
	editorOption: {
		// container: '#container',
		placeholder: '내용을 입력해주세요.',
		modules: {
			// toolbars: [
			// custom toolbars options
			// will override the default configuration
			// ],
			// other moudle options here
			// otherMoudle: {}
		}
		// more options
	},
	disabled: false
});

const onEditorBlur = (quill) => {};
const onEditorFocus = (quill) => {};
const onEditorReady = (quill) => {};
const onEditorChange = ({ quill, html, text }) => {
	state._content = html;
};

// setTimeout(() => {
// 	state.disabled = true;
// }, 2000);

// return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange };
// 	}
// };
</script>
