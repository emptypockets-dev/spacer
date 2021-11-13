<script>
	import { getStores, navigating, page, session } from '$app/stores';
	import MoveButtons from './MoveButtons.svelte';
	import MoveLevelButtons from './MoveLevelButtons.svelte';
	import { appState } from '../stores/app-state';
	import { projects } from '../stores/cards';
	let selectedCard;
	import DropdownMenu from './DropdownMenu.svelte';

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

<!-- Toolbar-->
<div class="flex-shrink-0" style="background-color: rgb(21,21,21);">
	<div class="h-16 flex flex-col justify-center">
		<div class="">
			<div class="py-3 flex items-center justify-between">
				<!-- Left buttons -->
				<div class="pl-4 relative inline-block text-left">
					<div>
						<button
							on:click={handleMoreDropdown}
							type="button"
							class="p-2 rounded-full bg-gray-700 flex items-center text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
							id="menu-3-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<span class="sr-only">Open options</span>
							<!-- Heroicon name: solid/dots-vertical -->
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="white"
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
				<span class="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
					<span class="-ml-px relative block sm:shadow-sm lg:hidden">
						<div>
							<button
								type="button"
								class="relative inline-flex items-center px-2  rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3"
								id="menu-2-button"
								aria-expanded="false"
								aria-haspopup="true"
							>
								<span class="sr-only sm:hidden">More</span>
								<span class="hidden sm:inline">More</span>
								<!-- Heroicon name: solid/chevron-down -->
								<svg
									class="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</span>
				</span>
				{#if $appState.showingAllCards}
					<!-- <div class="flex"> -->
					<MoveButtons />
					<!-- <MoveLevelButtons /> -->
					<!-- </div> -->
				{:else}
					<MoveLevelButtons />
				{/if}
				<!-- <MoveLevelButtons /> -->
				<!-- Right buttons -->

				<!-- <MoveLevelButtons /> -->
			</div>
		</div>
	</div>
</div>
