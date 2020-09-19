import { Command } from '@lib/command';
import { CustomClient } from '@lib/client';

export default class extends Command {

	public constructor(client: CustomClient, name: string) {
		super(client, name, {});
	}

	public run() {
		console.log(`Command ${this.name} has been executed!`);
	}

}
