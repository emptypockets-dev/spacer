<script>
	import { EditorState, basicSetup } from '@codemirror/basic-setup';
	import { Compartment } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { code } from '../stores/code';

	export let codeAnswer = `if (true) {
	console.log("okay")
} else {
	console.log("oh no")
}
`;

	onMount(() => {
		let language = new Compartment(),
			tabSize = new Compartment();
		let state = EditorState.create({
			doc: `let answer = 'this';\n`,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				language.of(javascript()),
				tabSize.of(EditorState.tabSize.of(2)),
				EditorView.updateListener.of((e) => {
					if (e.docChanged) {
						console.log(e);
						$code = e.state.doc.toString().replace(`let answer = 'this';\n`, '');
					}
				})
			]
		});
		let view = new EditorView({
			state,
			parent: document.querySelector('#editor')
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
