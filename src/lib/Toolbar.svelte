<script>
	import { getStores, navigating, page, session } from '$app/stores';
	import MoveButtons from './MoveButtons.svelte';
	import MoveLevelButtons from './MoveLevelButtons.svelte';
	import { appState } from '../stores/app-state';
</script>

<!-- Toolbar-->
<div class="flex-shrink-0 bg-white border-b border-gray-200">
	<div class="h-16 flex flex-col justify-center">
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="py-3 flex justify-between">
				<!-- Left buttons -->

				<span class="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
					<span class="hidden lg:flex space-x-3">
						<button
							type="button"
							class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
						>
							<!-- Heroicon name: solid/archive -->
							<svg
								class="mr-2.5 h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
								<path
									fill-rule="evenodd"
									d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Archive</span>
						</button>
					</span>

					<span class="-ml-px relative block sm:shadow-sm lg:hidden">
						<div>
							<button
								type="button"
								class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3"
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
									viewBox="0 0 20 20"
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

				<!-- Right buttons -->
				{#if $appState.showingAllCards}
					<MoveButtons />
				{:else}
					<MoveLevelButtons />
				{/if}
			</div>
		</div>
	</div>
</div>
