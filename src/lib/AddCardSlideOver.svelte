<script>
	import { appState } from '../stores/app-state';
	import { projects } from '../stores/cards';
	import { fly } from 'svelte/transition';
	import { levelLabels } from '../routes/api/utils';

	import Highlight from 'svelte-highlight';
	import { HighlightAuto } from 'svelte-highlight';
	import javascript from 'svelte-highlight/src/languages/javascript';
	import 'svelte-highlight/src/styles/atom-one-dark.css';
	// let highlightCode = 'const add = (a: number, b: number) => a + b;';
	// let code = '';
	import github from 'svelte-highlight/src/styles/github-dark';

	import hljs from 'highlight.js';
	import 'highlight.js/styles/github.css';
	// import github from 'svelte-highlight/src/styles/github-dark';

	let box;
	let xScroll = 0;
	let yScroll = 0;

	// $: highlightCode = code;

	let html = hljs.highlightAuto('<h1>Hello World!</h1>').value;
	let code = 'const add = (a: number, b: number) => a + b;';
	let highlightCode;

	$: highlightCode = hljs.highlight(code, {
		language: 'javascript'
	}).value;

	$: {
		// Handle final newlines (see article)
		if (code[code.length - 1] == '\n') {
			// If the last character is a newline character
			code += ' '; // Add a placeholder space character to the final line
		}
	}

	function check_tab(event) {
		code = box.value;
		if (event.key == 'Tab') {
			event.preventDefault();
			let before_tab = code.slice(0, box.selectionStart); // text before tab
			let after_tab = code.slice(box.selectionEnd, box.value.length); // text after tab
			let cursor_pos = box.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
			box.value = before_tab + '\t' + after_tab; // add tab char
			// move cursor
			box.selectionStart = cursor_pos;
			box.selectionEnd = cursor_pos;
			code = box.value;
		}
	}

	// $: {
	// 	if (code[code.length - 1] == '\n') {
	// 		// If the last character is a newline character
	// 		code += ' '; // Add a placeholder space character to the final line
	// 	}
	// }

	function parseScroll() {
		xScroll = box.scrollLeft;
		yScroll = box.scrollTop;
		let pre = document.querySelector('pre');
		let code = document.querySelector('code');
		pre.scrollTop = yScroll;
		code.scrollTop = yScroll;
	}

	let message = '';
	let error = '';

	let title = '';
	let question = '';
	let codeQuestion = 'let code = "question";';
	let codeAnswer = 'let code = "answer";';

	const createNewCard = ({ title, question, sandboxId }) => {
		let embed = sandboxId.sandbox_id;
		const card = {
			title: title,
			embed_slug: embed,
			question: question,
			level: 1,
			level_name: levelLabels[1].name,
			lastReview: new Date(),
			nextReview: new Date(),
			id: $projects.collections[0].cards.length
		};

		$projects.collections[0].cards.unshift(card);
		$projects = $projects;
	};

	const handleCloseToggle = () => {
		$appState.isAddCardSlideOverOpen = false;
	};

	const handleSubmit = async () => {
		console.log('value', value);
		try {
			const submit = await fetch('/api/sandbox', {
				method: 'POST',
				body: JSON.stringify({
					title,
					question,
					codeQuestion,
					codeAnswer
				})
			});
			const data = await submit.json();
			// console.log('drafts', data);
			// console.log('card', card.sandboxId.sandbox_id);
			createNewCard(data);
			handleCloseToggle();
		} catch (err) {
			error = err;
		}
	};
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div
	class="fixed inset-0 overflow-hidden"
	class:pointer-events-none={!$appState.isAddCardSlideOverOpen}
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
>
	<div class="absolute inset-0 overflow-hidden">
		<!-- Background overlay, show/hide based on slide-over state. -->
		<div
			class="absolute inset-0 {$appState.isAddCardSlideOverOpen
				? 'bg-gray-900 bg-opacity-80 transition-all duration-250'
				: 'transition-all duration-250'}"
			aria-hidden={$appState.isAddCardSlideOverOpen ? 'false' : 'true'}
		>
			<div class="fixed inset-y-0 pl-16 max-w-full right-0 flex">
				{#if $appState.isAddCardSlideOverOpen}
					<div
						class="w-screen max-w-md z-10 translate-x-full"
						in:fly={{ x: 450 }}
						out:fly={{ x: 450 }}
					>
						<form class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
							<div class="flex-1 h-0 overflow-y-auto">
								<div class="py-6 px-4 bg-indigo-700 sm:px-6">
									<div class="flex items-center justify-between">
										<h2 class="text-lg font-medium text-white" id="slide-over-title">New Card</h2>
										<div class="ml-3 h-7 flex items-center">
											<button
												on:click={handleCloseToggle}
												type="button"
												class="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
											>
												<span class="sr-only">Close panel</span>
												<!-- Heroicon name: outline/x -->
												<svg
													class="h-6 w-6"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>
									<div class="mt-1">
										<p class="text-sm text-indigo-300">
											Get started by filling in the information below to create your new card.
										</p>
									</div>
								</div>
								<div class="flex-1 flex flex-col justify-between">
									<div class="px-4 divide-y divide-gray-200 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											<div>
												<label for="title" class="block text-sm font-medium text-gray-900">
													Title
												</label>
												<div class="mt-1">
													<input
														bind:value={title}
														type="text"
														name="project-name"
														id="project-name"
														class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
													/>
												</div>
											</div>
											<div>
												<label for="question" class="block text-sm font-medium text-gray-900">
													Question
												</label>
												<div class="mt-1">
													<input
														bind:value={question}
														type="text"
														name="project-name"
														id="project-name"
														class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
													/>
												</div>
											</div>
											<div>
												<label for="code-answer" class="block text-sm font-medium text-gray-700"
													>Code Question</label
												>
												<!-- {#if CodeJar}
													<CodeJar
														class="hljs"
														syntax="javascript"
														{highlight}
														bind:value={codeQuestion}
														addClosing={true}
														indentOn={/{$/}
														spellcheck={false}
														tab={'\t'}
													/>
												{:else}

													<pr><code>{codeQuestion}</code></pr>
												{/if} -->
											</div>

											<div>
												<label for="code-answer" class="block text-sm font-medium text-gray-700"
													>Code Answer</label
												>

												<div class="input-wrapper">
													<textarea
														on:keydown={check_tab}
														class="box"
														bind:this={box}
														on:scroll={parseScroll}
														spellcheck="false"
														bind:value={code}
													/>

													<div class="highlighted">
														<pre><code>{@html highlightCode}</code></pre>
													</div>
												</div>
											</div>
											<div style="margin-top: 200px;" class="report">
												<div>horizontal: {xScroll}</div>
												<div>vertical: {yScroll}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex-shrink-0 px-4 py-4 flex justify-end">
								<button
									on:click={handleCloseToggle}
									type="button"
									class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Cancel
								</button>
								<button
									on:click|preventDefault={handleSubmit}
									type="submit"
									class="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.input-wrapper {
		position: relative;
	}

	.input-wrapper textarea {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		line-height: 1.2;
		width: 400px;
		height: 160px;
		background: transparent;
		color: rgba(0, 0, 0, 0);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
		font-size: 1em;
		caret-color: black;
		overflow: auto;
		white-space: pre-wrap;
		resize: none;
		padding: 0;
		margin: 0;
	}

	.highlighted {
		padding: 0;
		margin: 0;
	}
	.highlighted pre {
		margin: 0;
	}

	.highlighted,
	.highlighted pre,
	.highlighted code {
		position: absolute;
		top: 0;
		left: 0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
		width: 400px;
		height: 160px;
		overflow: auto;
		line-height: 1.2;
		white-space: pre-wrap;
	}
</style>
