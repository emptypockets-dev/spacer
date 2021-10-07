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
		<div
			class="min-h-screen"
			in:fly={{ y: 25, delay: 250 }}
			out:fly|local={{ y: 25, duration: 250 }}
		>
			<div class="min-h-screen">
				<div class="min-h-screen" style="background-color: rgb(36, 40, 42);">
					<iframe
						class="min-h-screen"
						src={`https://codesandbox.io/embed/${selectedCard.embed_slug}?autoresize=1&expanddevtools=1&fontsize=15&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark&editorsize=60&hidenavigation=1&codemirror=1`}
						style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
						title={selectedCard.embed_slug}
						allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
						sandbox="allow-forms allow-modals allow-popups  allow-same-origin allow-scripts"
					/>
				</div>
			</div>
		</div>
	{/key}
{/if}
