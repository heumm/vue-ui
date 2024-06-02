<template>
	<div v-if="editor" class="flex p-1 gap-[2px]">
		<input
			class="hidden"
			type="file"
			ref="fileInput"
			@change="handleFileInput($event)"
			accept="image/*" />
		<span v-for="(buttonItem, index) in buttonItems" class="flex">
			<editor-button
				v-if="buttonItem.title !== 'delimiter'"
				:key="index"
				v-bind="buttonItem"></editor-button>
			<div v-else class="mx-2 p-[1px] divide bg-gray-500"></div>
		</span>
		<!-- 
		<button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
		<button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
			h1
		</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
			h2
		</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
			h3
		</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
			h4
		</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
			h5
		</button>
		<button
			@click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
			:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
			h6
		</button>
		<button
			@click="editor.chain().focus().toggleCodeBlock().run()"
			:class="{ 'is-active': editor.isActive('codeBlock') }">
			code block
		</button>
		<button
			@click="editor.chain().focus().toggleBlockquote().run()"
			:class="{ 'is-active': editor.isActive('blockquote') }">
			blockquote
		</button>
		<button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
		<button @click="editor.chain().focus().setHardBreak().run()">hard break</button>
		<button
			@click="editor.chain().focus().undo().run()"
			:disabled="!editor.can().chain().focus().undo().run()">
			undo
		</button>
		<button
			@click="editor.chain().focus().redo().run()"
			:disabled="!editor.can().chain().focus().redo().run()">
			redo
		</button> -->
	</div>
	<editor-content
		class="min-h-[300px]"
		:editor="editor"
		@click="editor.chain().focus().run()"
		@mouseenter="console.log()" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Youtube from '@tiptap/extension-youtube';
import ImageResize from 'tiptap-extension-resize-image';
// import Blockquote from '@tiptap/extension-blockquote';

import EditorButton from '@/components/EditorButton.vue';
import {
	mdiFormatBold,
	mdiImagePlus,
	mdiFormatItalic,
	mdiFormatStrikethroughVariant,
	// mdiCodeTags,
	// mdiFormatParagraph,
	mdiFormatListBulleted,
	mdiOrderNumericAscending,
	mdiCodeBlockTags,
	mdiFormatQuoteClose,
	// mdiLandRowsHorizontal,
	mdiVideoPlus,
	mdiMinus
} from '@mdi/js'; //editor 버튼아이콘 path
import { onBeforeUnmount, onMounted, watch, ref } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	}
});

const emit = defineEmits(['update:modelValue']);
const fileInput = ref(null);
const handleFileInput = (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
		if (!file.type.includes('image')) {
			alert(
				`해당 파일은 이미지 파일이 아닙니다.\n이미지(JPG,JPEG,GIF,PNG)나 PDF 파일을 업로드 해주세요.`
			);
			event.target.value = '';
			return;
		}
		event.target.value = '';
	}
	reader.onload = (e) => {
		const base64 = e.target.result;
		editor.value.chain().focus().setImage({ src: base64 }).run();
	};
};

const editor = useEditor({
	extensions: [
		StarterKit.configure({
			image: {
				inline: true,
				allowBase64: true
			}
		}),
		// Blockquote,
		// Image.configure({
		// 	inline: true,
		// 	allowBase64: true
		// }),
		ImageResize,
		FileHandler.configure({
			allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
			onDrop: (currentEditor, files, pos) => {
				files.forEach((file) => {
					const fileReader = new FileReader();

					fileReader.readAsDataURL(file);
					fileReader.onload = () => {
						currentEditor
							.chain()
							.insertContentAt(pos, {
								type: 'image',
								attrs: {
									src: fileReader.result
								}
							})
							.focus()
							.run();
					};
				});
			},
			onPaste: (currentEditor, files) => {
				files.forEach((file) => {
					const fileReader = new FileReader();

					fileReader.readAsDataURL(file);
					fileReader.onload = () => {
						currentEditor
							.chain()
							.insertContentAt(currentEditor.state.selection.anchor, {
								type: 'image',
								attrs: {
									src: fileReader.result
								}
							})
							.focus()
							.run();
					};
				});
			}
		}),
		Youtube.configure({
			inline: false
		})
	],
	content: props.modelValue,
	editorProps: {
		attributes: {
			class:
				'prose prose-sm prose-gray-500 sm:prose-base lg:prose-lg xl:prose-2xl m-1 focus:outline-none prose-p:m-0 prose-hr:m-1 prose-hr:border-2 prose-img:m-0 before:prose-p:content-none after:prose-p:content-none'
		}
	},
	onUpdate: () => {
		// HTML

		emit('update:modelValue', editor.value.getHTML());

		// JSON
		// this.$emit('update:modelValue', this.editor.getJSON())
	}
});

const buttonItems = [
	{
		title: '굵게',
		isActive: () => editor.value.isActive('bold'),
		action: () => editor.value.chain().focus().toggleBold().run(),
		path: mdiFormatBold
	},

	{
		title: '기울임',
		isActive: () => editor.value.isActive('italic'),
		action: () => editor.value.chain().focus().toggleItalic().run(),
		path: mdiFormatItalic
	},
	{
		title: '취소선',
		isActive: () => editor.value.isActive('strike'),
		action: () => editor.value.chain().focus().toggleStrike().run(),
		path: mdiFormatStrikethroughVariant
	},
	{
		title: '제목1',
		isActive: () => editor.value.isActive('heading', { level: 1 }),
		action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
		path: null,
		items: [
			{
				title: '제목2',
				isActive: () => editor.value.isActive('heading', { level: 2 }),
				action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
				path: null
			},
			{
				title: '제목3',
				isActive: () => editor.value.isActive('heading', { level: 3 }),
				action: () => editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
				path: null
			},
			{
				title: '제목4',
				isActive: () => editor.value.isActive('heading', { level: 4 }),
				action: () => editor.value.chain().focus().toggleHeading({ level: 4 }).run(),
				path: null
			}
			// {
			// 	title: 'heading5',
			// 	isActive: () => editor.value.isActive('heading', { level: 5 }),
			// 	action: () => editor.value.chain().focus().toggleHeading({ level: 5 }).run(),
			// 	path: null
			// },
			// {
			// 	title: 'heading6',
			// 	isActive: () => editor.value.isActive('heading', { level: 6 }),
			// 	action: () => editor.value.chain().focus().toggleHeading({ level: 6 }).run(),
			// 	path: null
			// }
		]
	},
	{
		title: 'delimiter'
	},
	// {
	// 	title: 'code',
	// 	isActive: () => editor.value.isActive('code'),
	// 	action: () => editor.value.chain().focus().toggleCode().run(),
	// 	path: mdiCodeTags
	// },
	// {
	// 	title: 'paragraph',
	// 	isActive: () => editor.value.isActive('paragraph'),
	// 	action: () => editor.value.chain().focus().setParagraph().run(),
	// 	path: mdiFormatParagraph
	// }
	{
		title: '글머리(점)',
		isActive: () => editor.value.isActive('bulletList'),
		action: () => editor.value.chain().focus().toggleBulletList().run(),
		path: mdiFormatListBulleted
	},
	{
		title: '글머리(순서)',
		isActive: () => editor.value.isActive('orderedList'),
		action: () => editor.value.chain().focus().toggleOrderedList().run(),
		path: mdiOrderNumericAscending
	},
	{
		title: '코드',
		isActive: () => editor.value.isActive('codeBlock'),
		action: () => editor.value.chain().focus().toggleCodeBlock().run(),
		path: mdiCodeBlockTags
	},
	{
		title: '인용구',
		isActive: () => editor.value.isActive('blockquote'),
		action: () => editor.value.chain().focus().toggleBlockquote().run(),
		path: mdiFormatQuoteClose
	},
	{
		title: '구분선',
		isActive: () => false,
		action: () => editor.value.chain().focus().setHorizontalRule().run(),
		path: mdiMinus
	},
	{
		title: 'delimiter'
	},
	{
		title: '사진첨부',
		isActive: () => false,
		action: () => {
			// const url = window.prompt('URL');
			// if (url) {
			// 	editor.value.chain().focus().setImage({ src: url }).run();
			// }
			fileInput.value.click();
		},
		path: mdiImagePlus
	},
	{
		title: '유튜브업로드',
		isActive: () => false,
		action: () => {
			const url = prompt('YouTube주소를 입력해주세요.');
			editor.value
				.chain()
				.focus()
				.setYoutubeVideo({
					src: url,
					width: /*Math.max(320, parseInt(this.width, 10)) ||*/ 640,
					height: /*Math.max(180, parseInt(this.height, 10)) ||*/ 480
				})
				.run();
		},
		path: mdiVideoPlus
	}
];

watch(
	() => props.modelValue,
	(value) => {
		const isSame = editor.value.getHTML() === value;

		// JSON
		// const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

		if (isSame) {
			return;
		}

		editor.value.commands.setContent(value, false);
	}
);

onBeforeUnmount(() => {
	editor.value.destroy();
});
</script>
