<template>
	<div v-if="editor" class="flex p-1 gap-[2px]">
		<input class="hidden" type="file" ref="fileInput" @change="handleFileInput($event)" />
		<span v-for="(buttonItem, index) in buttonItems" class="flex">
			<EditorButton :key="index" v-bind="buttonItem"></EditorButton>
		</span>
		<!-- <button
			@click="editor.chain().focus().toggleBold().run()"
			:disabled="!editor.can().chain().focus().toggleBold().run()"
			:class="{ 'is-active': editor.isActive('bold') }">
			bold
		</button>
		<button
			@click="editor.chain().focus().toggleItalic().run()"
			:disabled="!editor.can().chain().focus().toggleItalic().run()"
			:class="{ 'is-active': editor.isActive('italic') }">
			italic
		</button>
		<button
			@click="editor.chain().focus().toggleStrike().run()"
			:disabled="!editor.can().chain().focus().toggleStrike().run()"
			:class="{ 'is-active': editor.isActive('strike') }">
			strike
		</button>
		<button
			@click="editor.chain().focus().toggleCode().run()"
			:disabled="!editor.can().chain().focus().toggleCode().run()"
			:class="{ 'is-active': editor.isActive('code') }">
			code
		</button>
		<button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
		<button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
		<button
			@click="editor.chain().focus().setParagraph().run()"
			:class="{ 'is-active': editor.isActive('paragraph') }">
			paragraph
		</button>
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
			@click="editor.chain().focus().toggleBulletList().run()"
			:class="{ 'is-active': editor.isActive('bulletList') }">
			bullet list
		</button>
		<button
			@click="editor.chain().focus().toggleOrderedList().run()"
			:class="{ 'is-active': editor.isActive('orderedList') }">
			ordered list
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
	<editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import FileHandler from '@tiptap-pro/extension-file-handler';

import EditorButton from '@/components/EditorButton.vue';
import { mdiFormatBold, mdiImagePlus } from '@mdi/js'; //editor 버튼아이콘 path
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
	reader.onload = (e) => {
		const base64 = e.target.result;
		editor.value.chain().focus().setImage({ src: base64 }).run();
	};
	if (file) {
		reader.readAsDataURL(file);
		// console.log('제거전:', fileInput.value.files);
		// console.dir('제거전:', fileInput.value.files);
		// fileInput.value.files = new FileList();
		// console.log('제거후:', fileInput.value.files);
	}
};

const editor = useEditor({
	extensions: [
		StarterKit,
		Image.configure({
			inline: true,
			allowBase64: true
		}),
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
		})
	],
	content: props.modelValue,
	editorProps: {
		attributes: {
			class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-1 focus:outline-none bg-info'
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
		title: 'bold',
		isActive: () => editor.value.isActive('bold'),
		action: () => editor.value.chain().focus().toggleBold().run(),
		path: mdiFormatBold
	},
	{
		title: 'image',
		isActive: () => false,
		action: () => {
			// const url = window.prompt('URL');
			// if (url) {
			// 	editor.value.chain().focus().setImage({ src: url }).run();
			// }
			fileInput.value.click();
		},
		path: mdiImagePlus
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
