import { writable } from 'svelte-local-storage-store';

export const projects = writable('projects', {
	collections: [
		{
			title: 'Learn Javascript',
			cards: []
		}
	]
});
