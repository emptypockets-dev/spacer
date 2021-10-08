<script>
	import { getStores, navigating, page, session } from '$app/stores';
	import { appState } from '../stores/app-state';

	const handleReviewFilters = (name) => {
		if (name === 'today') {
			// $appState.reviewLevelsFilter = [2, 1];
			$appState.showingAllCards = false;
		} else {
			// $appState.reviewLevelsFilter = [0, 1, 2, 3, 4, 5];
			$appState.showingAllCards = true;
		}
		// $appState.selectedCardId = null;
	};
</script>

<!-- Narrow sidebar -->
<div class="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
	<div class="w-full py-6 flex flex-col items-center">
		<div class="flex-shrink-0 flex items-center">
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
				alt="Workflow"
			/>
		</div>
		<div class="flex-1 mt-6 w-full px-2 space-y-1">
			<a
				on:click={() => handleReviewFilters('today')}
				href="/"
				class="group-hover:text-white hover:bg-indigo-800 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium {$page.path ===
				'/'
					? 'text-white'
					: 'text-indigo-300'}"
				class:bg-indigo-800={$page.path === '/'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span class="mt-2">Today</span>
			</a>

			<a
				on:click={() => handleReviewFilters('all-cards')}
				href="/all-cards"
				class="group-hover:text-whitehover:bg-indigo-800 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium {$page.path ===
				'/all-cards'
					? 'text-white'
					: 'text-indigo-300'}"
				class:bg-indigo-800={$page.path === '/all-cards'}
			>
				<svg
					class=" group-hover:text-white h-6 w-6"
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
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
				<span class="mt-2 text-center">All</span>
			</a>

			<a
				on:click={() => handleReviewFilters('archive')}
				href="/archive"
				class="group-hover:text-white hover:bg-indigo-800 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium {$page.path ===
				'/archive'
					? 'text-white'
					: 'text-indigo-300'}"
				class:bg-indigo-800={$page.path === '/archive'}
			>
				<!-- <svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
					/>
				</svg> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
					/>
				</svg>
				<span class="mt-2 text-center">Vault</span>
			</a>

			<a
				href="/settings"
				class="group-hover:text-whitehover:bg-indigo-800 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium {$page.path ===
				'/settings'
					? 'text-white'
					: 'text-indigo-300'}"
				class:bg-indigo-800={$page.path === '/settings'}
			>
				<svg
					class=" group-hover:text-white h-6 w-6"
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
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span class="mt-2">Settings</span>
			</a>
		</div>
	</div>
</div>
