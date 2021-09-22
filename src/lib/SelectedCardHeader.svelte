<script>
	import DropdownMenu from './DropdownMenu.svelte';
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';

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

<div class="bg-white pt-5 pb-6 shadow">
	<div class="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
		<div class="sm:w-0 sm:flex-1">
			<h1 id="message-heading" class="text-xl font-medium text-gray-900">
				{#if selectedCard}
					{selectedCard.title}
				{:else}
					Select a card to review
				{/if}
			</h1>

			<!-- <p class="mt-1 text-sm text-gray-500 truncate">in javascript</p> -->
		</div>

		<div
			class="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start"
		>
			<!-- <span
				class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
			>
				level one
			</span> -->
			<div class="ml-3 relative inline-block text-left">
				<div>
					<button
						on:click={handleMoreDropdown}
						type="button"
						class="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
						id="menu-3-button"
						aria-expanded="false"
						aria-haspopup="true"
					>
						<span class="sr-only">Open options</span>
						<!-- Heroicon name: solid/dots-vertical -->
						<svg
							class="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
							/>
						</svg>
					</button>
				</div>

				<!-- Dropdown menu -->
				<DropdownMenu />
			</div>
		</div>
	</div>
</div>
