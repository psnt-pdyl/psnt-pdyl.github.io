// @ts-check

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Set this to the deployed URL so the sitemap has correct links.
	site: 'https://psnt-pdyl.github.io',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
