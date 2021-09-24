<script>
	import { projects } from '../stores/cards';
	import { appState } from '../stores/app-state';

	import { fly } from 'svelte/transition';

	let selectedCard;

	$: {
		selectedCard = $projects.collections[0].cards.find((card) => {
			return card.id === $appState.selectedCardId;
		});
		console.log(selectedCard);
	}
</script>

<!-- Card section-->
{#if selectedCard}
	{#key selectedCard.id}
		<div class="py-7 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
			<div class="bg-white shadow sm:rounded-lg">
				<div
					class="bg-white px-6 py-8 shadow sm:rounded-lg"
					style="background-color: rgb(36, 40, 42);"
				>
					<iframe
						src={`https://codesandbox.io/embed/${selectedCard.embed_slug}?autoresize=1&expanddevtools=1&fontsize=15&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark`}
						style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
						title={selectedCard.embed_slug}
						allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
						sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
					/>
				</div>
			</div>
		</div>
	{/key}
{/if}
