import { writable } from 'svelte/store';

export const appState = writable({
	selectedCardId: null,
	isAddCardSlideOverOpen: false,
	isMoreDropdownOpen: false,
	reviewLevelsFilter: [0, 1, 2, 3, 4, 5]
});
