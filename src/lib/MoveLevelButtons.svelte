<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	const moveToFirstLevel = () => {
		const card = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});

		card.level = 1;
		card.lastReview = dayjs().startOf('day');
		card.nextReview = setNextReview(card.level, card.lastReview);
		$projects = $projects;
	};

	const moveToNextLevel = () => {
		const card = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});
		if (card.level < 5) {
			card.level += 1;
			card.lastReview = dayjs().startOf('day');
			console.log(card.lastReview);
			card.nextReview = setNextReview(card.level, card.lastReview);
			console.log(card.nextReview);
		}
		$projects = $projects;
	};

	const setNextReviewTiming = () => {
		const card = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});
		if (card) {
			// console.log('card level in review timing', card.level);
			switch (card.level) {
				case 1:
					console.log('does this happen');
					return 'Advance to level two';
					break;
				case 2:
					return 'Advance to level three';
					break;
				case 3:
					return 'Advance to level four';
					break;
				case 4:
					return 'Advance to level five';
					break;
				case 5:
					return 'Advance to level six';
					break;
				case 6:
					return 'Advance to level seven';
					break;
				case 7:
					return 'Put this in the vault!';
					break;
				default:
					break;
			}
		}
	};

	const setNextReview = (level, lastReview) => {
		switch (level) {
			case 1:
				return lastReview.add(1, 'day');
				break;
			case 2:
				return lastReview.add(2, 'day');
				break;
			case 3:
				return lastReview.add(4, 'day');
				break;
			case 4:
				return lastReview.add(8, 'day');
				break;
			case 5:
				return lastReview.add(16, 'day');
				break;
			case 6:
				return lastReview.add(32, 'day');
				break;
			case 7:
				return lastReview.add(64, 'day');
				break;
			default:
				break;
		}
	};

	$: {
		console.log($appState.selectedCardId);
		// setNextReviewTiming($appState.selectedCardId);
	}
</script>

<nav aria-label="Pagination">
	<div
		class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
	>
		<button
			on:click|preventDefault={moveToFirstLevel}
			type="button"
			class="inline-flex items-center justify-center px-4 py-2 border border-gray-600 bg-gray-800 shadow-sm text-sm font-medium rounded-md text-white  hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
				/>
			</svg>
			<span>&nbsp;&nbsp;Try again tomorrow</span>
		</button>
		<button
			on:click|preventDefault={moveToNextLevel}
			type="button"
			class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
		>
			<!-- {#if $appState.selectedCardId >= 0} -->
			<span>{setNextReviewTiming()}&nbsp;&nbsp;</span>
			<!-- {/if} -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</nav>
