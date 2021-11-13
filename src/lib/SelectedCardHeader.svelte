<script>
	import DropdownMenu from './DropdownMenu.svelte';
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import MoveButtons from './MoveButtons.svelte';
	import MoveLevelButtons from './MoveLevelButtons.svelte';

	let selectedCard;

	$: {
		selectedCard = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});
	}

	const handleMoreDropdown = () => {
		console.log('click handle more dropdown');
		$appState.isMoreDropdownOpen = !$appState.isMoreDropdownOpen;
	};
</script>

<div
	class="bg-white pt-4 pb-4 border-t border-b border-gray-700 shadow"
	style="background-color: rgb(21,21,21)"
>
	<div class="sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-4">
		<h1 id="message-heading" class="text-xl font-medium text-white">
			{#if selectedCard}
				{selectedCard.title}
			{:else}
				Select a card to review
			{/if}
		</h1>
		<div class="sm:w-0 sm:flex-1">
			<p class="mt-1 text-sm text-gray-400 truncate">
				{#if selectedCard}
					{selectedCard.question}
				{/if}
			</p>
		</div>

		<div class="flex items-center justify-between">
			<span
				class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-transparent text-indigo-500 border border-indigo-500 relative -top-1"
			>
				level one
			</span>
		</div>
	</div>
</div>
