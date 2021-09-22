module.exports = {
	purge: {
		content: ['./src/**/*.svelte'],
		safelist: []
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
};
