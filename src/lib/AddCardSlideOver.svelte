<script>
	import { appState } from '../stores/app-state';
	import { projects } from '../stores/cards';
	import { fly } from 'svelte/transition';
	import { levelLabels } from '../routes/api/utils';

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
			lastReview: null,
			id: $projects.collections[0].cards.length
		};

		$projects.collections[0].cards.unshift(card);
		$projects = $projects;
	};

	const handleCloseToggle = () => {
		$appState.isAddCardSlideOverOpen = false;
	};

	const handleSubmit = async () => {
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
			console.log('drafts', data);
			// console.log('card', card.sandboxId.sandbox_id);
			createNewCard(data);
			handleCloseToggle();
		} catch (err) {
			error = err;
		}
	};
</script>

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
												<div class="mt-1">
													<textarea
														bind:value={codeQuestion}
														class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
													/>
												</div>
											</div>
											<div>
												<label for="code-answer" class="block text-sm font-medium text-gray-700"
													>Code Answer</label
												>
												<div class="mt-1">
													<textarea
														bind:value={codeAnswer}
														class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
													/>
												</div>
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
