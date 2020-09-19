import { Command } from '@lib/command';
import { CustomClient } from '@lib/client';
import { microsecTime, formatTime } from '@/lib/utils';
import { Message } from 'discord.js';

export default class extends Command {

	public constructor(client: CustomClient, name: string) {
		super(client, name, {});
	}

	public async run(message: Message) {
		const t = microsecTime();

		const msg = await message.channel.send('Test du ping en cours...');

		await msg.edit(`Ping à l'API Discord: **${formatTime(microsecTime() - t)}**`);
	}

}
