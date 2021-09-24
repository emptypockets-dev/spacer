<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import CardsNav from './CardsNav.svelte';
	import { onMount } from 'svelte';
	export let title = '';
	let filteredCards = [];
	import dayjs from 'dayjs';

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
<aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
	<div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
		<div class="flex-shrink-0">
			<div class="h-16 bg-white px-6 flex flex-col justify-center">
				<div class="flex items-baseline space-x-3">
					<h2 class="text-lg font-medium text-gray-900">{title}</h2>
					<p class="text-sm font-medium text-gray-500">
						{#if filteredCards}
							{filteredCards.length} cards total
						{/if}
					</p>
				</div>
			</div>
			<div
				class="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500"
			>
				Sorted by level
			</div>
		</div>

		<CardsNav />
	</div>
</aside>
