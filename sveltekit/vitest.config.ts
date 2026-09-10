import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

export default defineConfig({
	plugins: [svelte({ hot: false })],
	resolve: {
		conditions: ['browser', 'module', 'development'],
		alias: [
			{ find: '$lib', replacement: path.resolve('./src/lib') },
			{ find: '$app/environment', replacement: path.resolve('./test/mocks/app-env.ts') },
			{ find: '$app/state', replacement: path.resolve('./test/mocks/app-state.ts') },
			{ find: '$app/navigation', replacement: path.resolve('./test/mocks/app-nav.ts') }
		]
	},
	test: {
		environment: 'jsdom',
		include: ['test/**/*.test.ts']
	}
});
