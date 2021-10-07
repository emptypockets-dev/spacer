<script>
	import { EditorState, basicSetup } from '@codemirror/basic-setup';
	import { Compartment } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { questionCode } from '../stores/question-code';
	import { answerCode } from '../stores/answer-code';

	export let id;
	export let code;

	onMount(() => {
		console.log(code);

		let language = new Compartment(),
			tabSize = new Compartment();
		let state = EditorState.create({
			doc: code,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				language.of(javascript()),
				tabSize.of(EditorState.tabSize.of(2)),
				EditorView.updateListener.of((e) => {
					if (e.docChanged) {
						if (id === 'editor-1') {
							$questionCode = e.state.doc.toString();
						} else if (id === 'editor-2') {
							$answerCode = e.state.doc.toString();
						}
					}
				})
			]
		});
		let view = new EditorView({
			state,
			parent: document.querySelector(`#${id}`)
		});
		// editor = new EditorView({
		// 	state: EditorState.create({
		// 		doc,
		// 		extensions: [basicSetup, keymap.of([indentWithTab]), javascript()]
		// 	}),
		// 	parent: document.querySelector('#editor')
		// });
	});

	function setTabSize(view, size) {
		view.dispatch({
			effects: tabSize.reconfigure(EditorState.tabSize.of(size))
		});
	}
</script>
