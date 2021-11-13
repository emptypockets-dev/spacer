<script>
	import { appState } from '../stores/app-state';
	import { projects } from '../stores/cards';

	const handleDeleteCard = () => {
		const card = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});
		const index = $projects.collections[0].cards.indexOf(card);
		$projects.collections[0].cards.splice(index, 1);
		$projects = $projects;
		$appState.isMoreDropdownOpen = false;
	};
</script>

{#if $appState.isMoreDropdownOpen}
	<div
		class="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-3-button"
		tabindex="-1"
	>
		<div class="py-1" role="none">
			<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
			<button
				type="button"
				class="text-gray-700 w-full flex justify-between px-4 py-2 text-sm"
				role="menuitem"
				tabindex="-1"
				id="menu-3-item-0"
			>
				<span>Edit card details</span>
			</button>
			<a
				href="/"
				on:click|preventDefault={handleDeleteCard}
				class="text-gray-700 flex justify-between px-4 py-2 text-sm"
				role="menuitem"
				tabindex="-1"
				id="menu-3-item-1"
			>
				<span>Delete card</span>
			</a>
		</div>
	</div>
{/if}
