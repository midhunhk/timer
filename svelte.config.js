import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
		preprocess: vitePreprocess({
		scss: {
			prependData: "@import './src/app.scss';",
		}
	}),
	kit: {
		adapter: adapter(),
	}
};

export default config;
