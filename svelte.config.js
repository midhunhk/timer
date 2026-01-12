import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
		preprocess: vitePreprocess({
		scss: {
			prependData: "@import './src/app.scss';",
		}
	}),
	kit: {
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				throw new Error(message);
			}
		},
		adapter: adapter(),
	}
};

export default config;
