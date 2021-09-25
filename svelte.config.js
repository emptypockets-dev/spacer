/** @type {import('@sveltejs/kit').Config} */

import vercel from '@sveltejs/adapter-vercel';
import path from 'path';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					$stores: path.resolve('./src/stores')
				}
			},
			optimizeDeps: {
				include: ['highlight.js/lib/core']
			}
		}
	}
};

export default config;
