/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('Fetching random cat from ' + env.CAT_API_URL + env.CAT_MANIFEST);
		const cats: string[] = await fetch(env.CAT_API_URL + env.CAT_MANIFEST).then((response) => {
			console.log('Response status: ' + response.status);
			return response.json();
		});
		console.log('Fetched ' + cats);
		let randomCat = cats[Math.floor(Math.random() * cats.length)];
		return fetch(env.CAT_API_URL + randomCat);
	},
} satisfies ExportedHandler<Env>;
