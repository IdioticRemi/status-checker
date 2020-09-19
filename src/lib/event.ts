import { CustomClient } from '@lib/client';

export abstract class Event {

	public client: CustomClient;
	public name: string;
	public event: string;

	public constructor(client: CustomClient, name: string, opts: EventOptions) {
		this.client = client;
		this.name = name;
		this.event = opts.event || name;
	}

	public abstract run(...params: any[]): void;

}

export interface EventOptions {
	event?: string;
}
