<script>
	import { appState } from '../stores/app-state';
	import { projects } from '../stores/cards';

	const selectNextIndex = () => {
		let currentIndex = $projects.collections[0].cards.findIndex((card) => {
			return card.id === $appState.selectedCardId;
		});
		let nextIndex = currentIndex;
		if (currentIndex >= $projects.collections[0].cards.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = ++currentIndex;
		}

		let nextCardId = $projects.collections[0].cards[nextIndex].id;
		$appState.selectedCardId = nextCardId;
	};
	const selectPreviousIndex = () => {
		let currentIndex = $projects.collections[0].cards.findIndex((card) => {
			return card.id === $appState.selectedCardId;
		});
		let nextIndex = currentIndex;
		if (currentIndex === 0) {
			nextIndex = $projects.collections[0].cards.length - 1;
		} else {
			nextIndex = --currentIndex;
		}

		let nextCardId = $projects.collections[0].cards[nextIndex].id;
		$appState.selectedCardId = nextCardId;
	};
</script>

<nav aria-label="Pagination">
	<span class="relative z-0 inline-flex shadow-sm rounded-md">
		<a
			on:click|preventDefault={selectPreviousIndex}
			href="/"
			class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
		>
			<span class="sr-only">Previous</span>
			<!-- Heroicon name: solid/chevron-up -->
			<svg
				class="h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
		<a
			on:click|preventDefault={selectNextIndex}
			href="/"
			class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
		>
			<span class="sr-only">Next</span>

			<!-- Heroicon name: solid/chevron-down -->
			<svg
				class="h-5 w-5"
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
		</a>
	</span>
</nav>
