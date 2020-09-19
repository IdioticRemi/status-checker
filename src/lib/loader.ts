import { scan } from 'fs-nextra';
import { join } from 'path';

import { CustomClient } from '@lib/client';

const scanDir = async (fName: string): Promise<Map<string, any>> => scan(join(__dirname, fName), {
	filter: (stats, path) => stats.isFile() && path.endsWith('.js')
});

export default async (client: CustomClient) => {
	const commands = await scanDir('../commands');
	const events = await scanDir('../events');

	const cmdIterator = commands.keys();
	const evtIterator = events.keys();

	for (let i = 0; i < commands.size; i++) {
		try {
			const path: Array<string> = cmdIterator.next().value.replace(/\//g, '\\').replace(/\\\\/g, '\\').split('\\');
			const name: string = path[path.length - 1].split('.')[0];

			const command = new (await import(path.join('/'))).default(client, name);

			client.commands.set(name, command);
		} catch (err) {
			console.error(err);
		}
	}

	for (let i = 0; i < events.size; i++) {
		try {
			const path: Array<string> = evtIterator.next().value.replace(/\//g, '\\').replace(/\\\\/g, '\\').split('\\');
			const name: string = path[path.length - 1].split('.')[0];

			const event = new (await import(path.join('/'))).default(client, name);

			client.on(event.event, (...args) => event.run(...args));
			client.events.set(name, event);
		} catch (err) {
			console.error(err);
		}
	}

	process.nextTick(() => {
		console.log(''.padEnd(60, '-=-'));
		console.log();
		console.log(`» Préfixe configuré   :  ${client.prefix}`);
		console.log(`» Commandes chargées  :  ${client.commands.size}`);
		console.log(`» Évènements chargés  :  ${client.events.size}`);
		console.log();
		console.log(''.padEnd(60, '-=-'));
		console.log();
	});
};
