import { Message } from 'discord.js';

import { CustomClient } from '@lib/client';
import { Event } from '@lib/event';
import { PermFlags, microsecTime, formatTime } from '@lib/utils';

export default class extends Event {

	public constructor(client: CustomClient, name: string) {
		super(client, name, {});
	}

	public async run(message: Message) {
		if (message.channel.type !== 'text' || message.author.bot) return;
		if (!message.channel.permissionsFor(this.client.user!.id)!.has(PermFlags.SEND_MESSAGES)) return;

		if (!message.content.startsWith(this.client.prefix)) return;

		const args = message.content.slice(this.client.prefix.length).trim().split(/ +/g);
		const cmd = args.shift()!.toLowerCase();

		const command = this.client.commands.get(cmd);

		if (!command) return;

		try {
			const t = microsecTime();
			await command.run(message, args);
			const delta_t = microsecTime() - t;

			console.log(`[${formatTime(delta_t)}] ${message.author.tag} (${message.author.id}): ${this.client.prefix}${command.name} ${args.join(' ')}`);
		} catch (err) {
			console.error(err);
		}
	}

}
