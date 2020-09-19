import 'module-alias/register';

console.clear();

import { clientOptions, keyring } from '@root/config';
import { CustomClient } from '@lib/client';
import load from '@/lib/loader';

const client = new CustomClient(clientOptions);

setTimeout(async () => {
	await load(client);

	await client.login(keyring.TOKEN);
}, 0);
