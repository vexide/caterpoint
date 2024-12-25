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
		const randomCat = cats[Math.floor(Math.random() * cats.length)];

		let response = await fetch(env.CAT_API_URL + randomCat);

		let redirect = new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				...Object.fromEntries(response.headers),
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
				Pragma: 'no-cache',
				Expires: '0',
			},
		});

		return redirect;
	},
} satisfies ExportedHandler<Env>;
