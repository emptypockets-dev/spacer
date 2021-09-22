<script>
	import '../css/tailwind.css';
	import NarrowSidebar from '$lib/NarrowSidebar.svelte';
	import AppHeader from '$lib/AppHeader.svelte';
</script>

<div class="relative h-screen bg-gray-50 flex overflow-hidden">
	<NarrowSidebar />
	<div class="flex-1 flex flex-col overflow-hidden">
		<AppHeader />
		<slot />
	</div>
</div>
