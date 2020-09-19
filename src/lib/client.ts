import { Client, ClientOptions, Collection } from 'discord.js';

import { prefix } from '@root/config';
import { Command } from '@lib/command';
import { Event } from '@lib/event';

export class CustomClient extends Client {

	public prefix: string;
	public commands: Collection<string, Command>;
	public events: Collection<string, Event>;

	public constructor(clientOptions: ClientOptions) {
		super(clientOptions);

		this.prefix = prefix;
		this.commands = new Collection();
		this.events = new Collection();
	}

}
