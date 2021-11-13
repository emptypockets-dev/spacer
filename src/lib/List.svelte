<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import CardsNav from './CardsNav.svelte';
	import { onMount } from 'svelte';
	export let title = '';
	let filteredCards = [];
	import dayjs from 'dayjs';
	import AppHeader from './AppHeader.svelte';

	const handleSlideOver = () => {
		$appState.isAddCardSlideOverOpen = !$appState.isAddCardSlideOverOpen;
	};

	onMount(() => {
		filteredCards = $projects.collections[0].cards.filter((card) => {
			if ($appState.showingAllCards) {
				return card;
			} else {
				let startToday = dayjs().startOf('day');
				let nextReview = dayjs(card.nextReview);
				let isBetween = nextReview.isSame(startToday, 'day');
				return isBetween;
			}
		});
	});
</script>

<!-- Message list-->
<!-- <AppHeader /> -->
<aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
	<div
		class="h-full relative flex flex-col w-96 border-r border-gray-700 bg-gray-800"
		style="background-color: rgb(10,10,10);"
	>
		<div class="flex-shrink-0">
			<div
				class="h-16 bg-gray-800 px-4 flex flex-col justify-center"
				style="background-color: rgb(10,10,10);"
			>
				<div class="flex items-baseline space-x-3 justify-between">
					<h2 class="text-lg font-medium text-gray-400">{title}</h2>
					<!-- <p class="text-sm font-medium text-gray-500">
						{#if filteredCards}
							{filteredCards.length} cards total
						{/if}
					</p> -->
					<button
						on:click={handleSlideOver}
						type="button"
						class="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<!-- Heroicon name: outline/plus-sm -->
						<svg
							class="h-5 w-5"
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
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						<span class="sr-only">Add file</span>
					</button>
				</div>
			</div>

			<div
				class="border-t border-b border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-600"
				style="background-color: rgb(10,10,10);"
			>
				Sorted by level
			</div>
		</div>

		<CardsNav />
	</div>
</aside>
