import { Event } from '@lib/event';
import { CustomClient } from '@/lib/client';

export default class extends Event {

	public constructor(client: CustomClient, name: string) {
		super(client, name, {});
	}

	public run() {
		console.log(`Connecté à Discord sous le pseudo ${this.client.user!.tag}\n`);

		this.client.emit('serverLoop');
		setInterval(() => this.client.emit('serverLoop'), 60 * 1000);
	}

}
