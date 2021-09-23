<script>
	import List from '$lib/List.svelte';
	import Toolbar from '$lib/Toolbar.svelte';
	import SelectedCard from '$lib/SelectedCard.svelte';
	import SelectedCardHeader from '$lib/SelectedCardHeader.svelte';
	// import { projects } from '$stores/cards';
	// import { appState } from '$stores/app-state';
	import AddCardSlideOver from '$lib/AddCardSlideOver.svelte';

	import { onMount } from 'svelte';
	let title = 'To Review';
</script>

<div class="relative h-screen overflow-hidden bg-gray-300 flex flex-col">
	<div class="min-h-0 flex-1 flex overflow-hidden">
		<!-- Main area -->
		<main class="min-w-0 flex-1 xl:flex">
			<List {title} />

			<section
				aria-labelledby="message-heading"
				class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
			>
				<Toolbar />

				<div class="min-h-0 flex-1 overflow-y-auto">
					<SelectedCardHeader />
					<!-- Card Section -->
					<SelectedCard />
				</div>
			</section>

			<AddCardSlideOver />
		</main>
	</div>
</div>
