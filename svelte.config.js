import adapter from '@sveltejs/adapter-static';
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
		paths: {
			base: '/timer'
		}
	}
};

export default config;
