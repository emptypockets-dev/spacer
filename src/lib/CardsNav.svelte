<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';
	import { levelLabels } from '../routes/api/utils';
	import { onMount } from 'svelte';
	let selectedCard;
	let filteredCards = [];

	import { fade, fly } from 'svelte/transition';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import calendar from 'dayjs/plugin/calendar.js';

	dayjs.extend(relativeTime);
	dayjs.extend(calendar);

	onMount(() => {
		filteredCards = $projects.collections[0].cards.filter((card) => {
			if ($appState.showingAllCards) {
				let startToday = dayjs().startOf('day');
				let nextReview = dayjs(card.nextReview);
				let isBetween = nextReview.isSame(startToday, 'day');
				let pastReview = nextReview.isBefore(startToday, 'day');
				if (pastReview) {
					console.log('this past review happens');
					card.nextReview = dayjs().startOf('day');
				}
				return card;
			} else {
				let startToday = dayjs().startOf('day');
				console.log('start today', startToday.format('MM/DD/YYYY'));
				let nextReview = dayjs(card.nextReview);
				console.log('next review', nextReview.format('MM/DD/YYYY'));
				// let isBetween = nextReview.isSame(startToday, 'day');
				let pastReview = nextReview.isBefore(startToday, 'day');
				if (pastReview) {
					console.log('the other past review');
					card.nextReview = dayjs().startOf('day');
				}
				return pastReview;
			}
		});
		if (filteredCards.length > 0) {
			let clicked = filteredCards[0].id;
			$appState.selectedCardId = clicked;
			handleClick(clicked);
		} else {
			$appState.selectedCardId = null;
		}
	});

	const displayNextReview = (date) => {
		let startToday = dayjs().startOf('day');

		let nextReview = dayjs(date);

		let isBetween = nextReview.isSame(startToday, 'day');
		if (isBetween) {
			return 'today';
		} else {
			return dayjs().to(dayjs(nextReview));
		}
	};

	$: {
		filteredCards = $projects.collections[0].cards.filter((card) => {
			if ($appState.showingAllCards) {
				return card;
			} else {
				let startToday = dayjs().startOf('day');
				let nextReview = dayjs(card.nextReview);
				let isBetween = nextReview.isSame(startToday, 'day');
				let pastReview = nextReview.isBefore(startToday, 'day');
				if (pastReview) {
					card.nextReview = dayjs().startOf('day');
				}
				if (isBetween || pastReview) {
					return true;
				}
			}
		});
	}

	const handleClick = (cardId) => {
		$appState.selectedCardId = cardId;
	};
</script>

{#if filteredCards.length > 0}
	<nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
		<ul role="list" class="border-b border-gray-700 divide-y divide-gray-700">
			{#each filteredCards as card (card.id)}
				<li
					class="relative bg-gray-800 py-5 px-4 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
					class:selected={card.id === $appState.selectedCardId}
					style="background-color: rgb(10,10,10);"
				>
					<div class="flex justify-between items-start space-x-3">
						<div class="min-w-0 flex-1">
							<a
								href="/"
								on:click|preventDefault={() => handleClick(card.id)}
								class="block focus:outline-none"
							>
								<span class="absolute inset-0" aria-hidden="true" />
								<p class="text-sm font-medium text-gray-200 truncate">{card.title}</p>

								<!-- <p class="text-sm text-gray-500 truncate">
									<span>review</span>
									{dayjs().to(dayjs(card.nextReview))}
								</p>
								<p>{dayjs().calendar(dayjs(card.nextReview))}</p> -->
								<!-- <p class="text-sm text-gray-500 truncate">
									review
									{dayjs(card.nextReview).format('MM/DD/YYYY')}
								</p> -->
							</a>
						</div>
						<span
							class="inline-flex justify-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-500 text-gray-400"
						>
							<!-- {levelLabels[ -->

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
						<p class="line-clamp-2 text-sm text-gray-500">
							<!-- {card.question} -->
							<!-- next review: {dayjs(card.nextReview).format('MM/DD/YYYY')} -->
							Next review {displayNextReview(card.nextReview)}
							<!-- - {JSON.stringify(card)} -->
							<!-- Review {dayjs().to(card.nextReview)} -->
							<!-- {dayjs(card.nextReview).toNow()} -->
							<!-- {dayjs().calendar(dayjs(card.nextReview))} -->

							<!-- review level {card.level} -->
							<!-- {card.nextReview} -->
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</nav>
{:else}
	<!-- This example requires Tailwind CSS v2.0+ -->
	<div class="p-10">
		<button
			type="button"
			class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mx-auto h-6 w-6 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>

			<span class="mt-2 block text-sm font-light text-gray-500"> Create a new card to review </span>
		</button>
	</div>
{/if}

<style>
	ul li.selected {
		background-color: rgb(21, 21, 21) !important;
	}
</style>
