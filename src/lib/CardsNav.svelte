<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import { levelLabels } from '../routes/api/utils';
	import { onMount } from 'svelte';
	let selectedCard;
	let filteredCards = [];
	// export let theFilteredCards = [];

	let theFilteredCards = [];

	onMount(() => {
		filteredCards = $projects.collections[0].cards.filter((card) => {
			return $appState.reviewLevelsFilter.includes(card.level);
		});
		let clicked = filteredCards[0].id;
		$appState.selectedCardId = clicked;
		handleClick(clicked);
	});

	$: {
		filteredCards = $projects.collections[0].cards.filter((card) => {
			return $appState.reviewLevelsFilter.includes(card.level);
		});
	}

	const handleClick = (cardId) => {
		$appState.selectedCardId = cardId;
	};
</script>

<nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
	<ul role="list" class="border-b border-gray-200 divide-y divide-gray-200">
		{#each filteredCards as card}
			<li
				class="relative bg-white py-5 px-6 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
				class:bg-gray-100={card.id === $appState.selectedCardId}
			>
				<div class="flex justify-between items-start space-x-3">
					<div class="min-w-0 flex-1">
						<a
							href="/"
							on:click|preventDefault={() => handleClick(card.id)}
							class="block focus:outline-none"
						>
							<span class="absolute inset-0" aria-hidden="true" />
							<p class="text-sm font-medium text-gray-900 truncate">{card.title}</p>
							<p class="text-sm text-gray-500 truncate">in javascript</p>
						</a>
					</div>
					<span
						class="inline-flex justify-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium {levelLabels[
							card.level
						].color} {levelLabels[card.level].bg}"
					>
						<svg
							class="-ml-0.5 mr-1.5 h-2 w-2 {levelLabels[card.level].color}"
							fill="currentColor"
							viewBox="0 0 8 8"
						>
							<circle cx="4" cy="4" r="3" />
						</svg>
						{levelLabels[card.level].name}
					</span>
				</div>
				<div class="mt-1">
					<p class="line-clamp-2 text-sm text-gray-600">
						{card.question}
					</p>
				</div>
			</li>
		{/each}
	</ul>
</nav>
